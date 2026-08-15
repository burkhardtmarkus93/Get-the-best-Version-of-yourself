(function () {
  "use strict";

  fetch("data/vocab-manifest.json")
    .then(function (res) { return res.json(); })
    .then(function (manifest) {
      return Promise.all(manifest.map(function (entry) {
        return fetch("data/" + entry.file).then(function (res) { return res.json(); });
      }));
    })
    .then(function (chunks) {
      var all = [];
      chunks.forEach(function (chunk) { all = all.concat(chunk); });
      start(all);
    })
    .catch(function (err) {
      document.querySelector("main").innerHTML =
        '<p class="empty-state">Vokabeldaten konnten nicht geladen werden (' + err.message +
        '). Bitte die Seite über einen lokalen Server öffnen, z.B. <code>python3 -m http.server</code>.</p>';
    });

  function start(VOCAB) {
  var STORAGE_KEY = "vocabTrainer.progress.v1";
  var PREF_KEY = "vocabTrainer.prefs.v1";
  var BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16]; // days until a card in this box becomes due again after a correct answer
  var BOX_LABELS = ["Neu / Box 1", "Box 2", "Box 3", "Box 4", "Box 5 (gelernt)"];

  var LANG_NAMES = { de: "Deutsch", en: "Englisch", pt: "Portugiesisch", es: "Spanisch" };

  var categories = Array.from(new Set(VOCAB.map(function (c) { return c.category; }))).sort();

  var state = {
    progress: loadProgress(),
    prefs: loadPrefs(),
    session: [],
    sessionIndex: 0,
    quiz: { pool: [], index: 0, correct: 0, total: 0, answered: false }
  };

  // ---------- persistence ----------

  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); } catch (e) {}
  }

  function loadPrefs() {
    try {
      var raw = localStorage.getItem(PREF_KEY);
      var p = raw ? JSON.parse(raw) : {};
      return {
        from: p.from || "de",
        to: p.to || "en",
        categories: p.categories && p.categories.length ? p.categories : categories.slice()
      };
    } catch (e) {
      return { from: "de", to: "en", categories: categories.slice() };
    }
  }

  function savePrefs() {
    try { localStorage.setItem(PREF_KEY, JSON.stringify(state.prefs)); } catch (e) {}
  }

  function progressKey(cardIndex, from, to) {
    return cardIndex + "_" + from + "_" + to;
  }

  function getCardProgress(cardIndex, from, to) {
    var key = progressKey(cardIndex, from, to);
    return state.progress[key] || { box: 0, due: 0, seen: 0 };
  }

  function setCardProgress(cardIndex, from, to, entry) {
    var key = progressKey(cardIndex, from, to);
    state.progress[key] = entry;
    saveProgress();
  }

  // ---------- tabs ----------

  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
      if (btn.dataset.tab === "stats") renderStats();
      if (btn.dataset.tab === "cards") buildSession();
      if (btn.dataset.tab === "quiz") buildQuiz();
    });
  });

  // ---------- filter bar ----------

  var fromSel = document.getElementById("fromLang");
  var toSel = document.getElementById("toLang");
  fromSel.value = state.prefs.from;
  toSel.value = state.prefs.to;

  function syncToOptions() {
    Array.from(toSel.options).forEach(function (opt) {
      opt.disabled = opt.value === fromSel.value;
    });
    if (toSel.value === fromSel.value) {
      var alt = Array.from(toSel.options).find(function (o) { return o.value !== fromSel.value; });
      if (alt) toSel.value = alt.value;
    }
  }
  syncToOptions();

  fromSel.addEventListener("change", function () {
    syncToOptions();
    state.prefs.from = fromSel.value;
    state.prefs.to = toSel.value;
    savePrefs();
    buildSession();
    buildQuiz();
  });

  toSel.addEventListener("change", function () {
    state.prefs.to = toSel.value;
    savePrefs();
    buildSession();
    buildQuiz();
  });

  var chipsEl = document.getElementById("categoryChips");
  categories.forEach(function (cat) {
    var chip = document.createElement("button");
    chip.className = "chip" + (state.prefs.categories.indexOf(cat) !== -1 ? " active" : "");
    chip.textContent = cat;
    chip.dataset.cat = cat;
    chip.addEventListener("click", function () {
      var idx = state.prefs.categories.indexOf(cat);
      if (idx === -1) {
        state.prefs.categories.push(cat);
        chip.classList.add("active");
      } else {
        if (state.prefs.categories.length === 1) return; // keep at least one
        state.prefs.categories.splice(idx, 1);
        chip.classList.remove("active");
      }
      savePrefs();
      buildSession();
      buildQuiz();
    });
    chipsEl.appendChild(chip);
  });

  function filteredIndices() {
    var out = [];
    VOCAB.forEach(function (card, i) {
      if (state.prefs.categories.indexOf(card.category) !== -1) out.push(i);
    });
    return out;
  }

  // ---------- flashcards ----------

  var flashcardEl = document.getElementById("flashcard");
  var cardFrontEl = document.getElementById("cardFront");
  var cardBackEl = document.getElementById("cardBack");
  var cardCategoryEl = document.getElementById("cardCategory");
  var cardCategoryBackEl = document.getElementById("cardCategoryBack");
  var cardExtraEl = document.getElementById("cardExtra");
  var rateButtons = document.getElementById("rateButtons");
  var emptyState = document.getElementById("emptyState");
  var dueCountEl = document.getElementById("dueCount");

  function buildSession() {
    var from = state.prefs.from, to = state.prefs.to;
    var now = Date.now();
    var indices = filteredIndices();

    var due = [];
    var fresh = [];
    indices.forEach(function (i) {
      var p = getCardProgress(i, from, to);
      if (p.seen === 0) fresh.push(i);
      else if (p.due <= now) due.push({ i: i, due: p.due });
    });
    due.sort(function (a, b) { return a.due - b.due; });

    var ordered = due.map(function (d) { return d.i; }).concat(shuffle(fresh));
    state.session = ordered.slice(0, 30);
    state.sessionIndex = 0;

    dueCountEl.textContent = state.session.length + " Karte" + (state.session.length === 1 ? "" : "n") + " fällig";
    showCurrentCard();
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function showCurrentCard() {
    flashcardEl.classList.remove("flipped");
    rateButtons.classList.add("hidden");

    if (state.sessionIndex >= state.session.length) {
      flashcardEl.style.visibility = "hidden";
      emptyState.classList.remove("hidden");
      return;
    }
    flashcardEl.style.visibility = "visible";
    emptyState.classList.add("hidden");

    var card = VOCAB[state.session[state.sessionIndex]];
    var from = state.prefs.from, to = state.prefs.to;
    cardCategoryEl.textContent = card.category;
    cardCategoryBackEl.textContent = card.category;
    cardFrontEl.textContent = card[from];
    cardBackEl.textContent = card[to];
    cardExtraEl.textContent = LANG_NAMES[from] + " → " + LANG_NAMES[to];
  }

  flashcardEl.addEventListener("click", function () {
    if (state.sessionIndex >= state.session.length) return;
    var flipped = flashcardEl.classList.toggle("flipped");
    if (flipped) rateButtons.classList.remove("hidden");
  });

  function rateCurrentCard(correct) {
    var cardIndex = state.session[state.sessionIndex];
    var from = state.prefs.from, to = state.prefs.to;
    var p = getCardProgress(cardIndex, from, to);
    var now = Date.now();
    var box = correct ? Math.min(p.box + 1, BOX_INTERVAL_DAYS.length - 1) : 0;
    var due = now + BOX_INTERVAL_DAYS[box] * 86400000;
    setCardProgress(cardIndex, from, to, { box: box, due: due, seen: (p.seen || 0) + 1 });

    state.sessionIndex++;
    showCurrentCard();
  }

  document.getElementById("btnGood").addEventListener("click", function () { rateCurrentCard(true); });
  document.getElementById("btnWrong").addEventListener("click", function () { rateCurrentCard(false); });
  document.getElementById("resetSessionBtn").addEventListener("click", buildSession);

  document.addEventListener("keydown", function (e) {
    if (!document.getElementById("tab-cards").classList.contains("active")) return;
    if (e.code === "Space") { e.preventDefault(); flashcardEl.click(); }
    if (flashcardEl.classList.contains("flipped")) {
      if (e.key === "ArrowRight" || e.key === "1") rateCurrentCard(true);
      if (e.key === "ArrowLeft" || e.key === "0") rateCurrentCard(false);
    }
  });

  // ---------- quiz ----------

  var quizCategoryEl = document.getElementById("quizCategory");
  var quizQuestionEl = document.getElementById("quizQuestion");
  var quizOptionsEl = document.getElementById("quizOptions");
  var quizFeedbackEl = document.getElementById("quizFeedback");
  var quizScoreEl = document.getElementById("quizScore");
  var quizEmptyState = document.getElementById("quizEmptyState");
  var quizStage = document.querySelector(".quiz-stage");

  function buildQuiz() {
    var indices = filteredIndices();
    if (indices.length < 4) {
      quizStage.classList.add("hidden");
      quizEmptyState.classList.remove("hidden");
      return;
    }
    quizStage.classList.remove("hidden");
    quizEmptyState.classList.add("hidden");

    state.quiz.pool = shuffle(indices).slice(0, 15);
    state.quiz.index = 0;
    state.quiz.correct = 0;
    state.quiz.total = 0;
    updateQuizScore();
    showQuizQuestion();
  }

  function updateQuizScore() {
    quizScoreEl.textContent = state.quiz.correct + " / " + state.quiz.total;
  }

  function showQuizQuestion() {
    quizFeedbackEl.textContent = "";
    quizOptionsEl.innerHTML = "";
    state.quiz.answered = false;

    if (state.quiz.index >= state.quiz.pool.length) {
      quizQuestionEl.textContent = "Runde beendet! 🎉";
      quizCategoryEl.textContent = "";
      quizFeedbackEl.textContent = "Ergebnis: " + state.quiz.correct + " von " + state.quiz.total + " richtig.";
      return;
    }

    var from = state.prefs.from, to = state.prefs.to;
    var cardIndex = state.quiz.pool[state.quiz.index];
    var card = VOCAB[cardIndex];
    quizCategoryEl.textContent = card.category;
    quizQuestionEl.textContent = card[from];

    var sameCategory = filteredIndices().filter(function (i) {
      return i !== cardIndex && VOCAB[i].category === card.category && VOCAB[i][to] !== card[to];
    });
    var otherAny = filteredIndices().filter(function (i) {
      return i !== cardIndex && VOCAB[i][to] !== card[to];
    });
    var distractorSource = sameCategory.length >= 3 ? sameCategory : otherAny;
    var distractors = shuffle(distractorSource).slice(0, 3).map(function (i) { return VOCAB[i][to]; });

    var options = shuffle([card[to]].concat(distractors));
    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", function () { handleQuizAnswer(btn, opt, card[to], cardIndex); });
      quizOptionsEl.appendChild(btn);
    });
  }

  function handleQuizAnswer(btn, chosen, correctAnswer, cardIndex) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;
    state.quiz.total++;

    var from = state.prefs.from, to = state.prefs.to;
    var isCorrect = chosen === correctAnswer;
    if (isCorrect) state.quiz.correct++;

    var p = getCardProgress(cardIndex, from, to);
    var now = Date.now();
    var box = isCorrect ? Math.min(p.box + 1, BOX_INTERVAL_DAYS.length - 1) : 0;
    var due = now + BOX_INTERVAL_DAYS[box] * 86400000;
    setCardProgress(cardIndex, from, to, { box: box, due: due, seen: (p.seen || 0) + 1 });

    Array.from(quizOptionsEl.children).forEach(function (child) {
      child.setAttribute("disabled", "true");
      if (child.textContent === correctAnswer) child.classList.add("correct");
      else if (child === btn) child.classList.add("incorrect");
    });

    quizFeedbackEl.textContent = isCorrect ? "Richtig!" : "Richtige Antwort: " + correctAnswer;
    updateQuizScore();

    setTimeout(function () {
      state.quiz.index++;
      showQuizQuestion();
    }, 1100);
  }

  document.getElementById("restartQuizBtn").addEventListener("click", buildQuiz);

  // ---------- stats ----------

  function renderStats() {
    var from = state.prefs.from, to = state.prefs.to;
    document.getElementById("statsDirection").textContent = LANG_NAMES[from] + " → " + LANG_NAMES[to];

    var boxCounts = [0, 0, 0, 0, 0];
    var indices = filteredIndices();
    indices.forEach(function (i) {
      var p = getCardProgress(i, from, to);
      boxCounts[p.seen > 0 ? p.box : 0] += p.seen > 0 ? 1 : 0;
    });
    var unseen = indices.length - boxCounts.reduce(function (a, b) { return a + b; }, 0);

    var maxVal = Math.max.apply(null, boxCounts.concat([unseen, 1]));
    var boxBarsEl = document.getElementById("boxBars");
    boxBarsEl.innerHTML = "";

    var bars = [{ label: "Ungesehen", val: unseen }].concat(
      BOX_LABELS.map(function (label, idx) { return { label: label, val: boxCounts[idx] }; })
    );

    bars.forEach(function (b) {
      var wrap = document.createElement("div");
      wrap.className = "box-bar";
      var fill = document.createElement("div");
      fill.className = "box-bar-fill";
      fill.style.height = Math.max(3, (b.val / maxVal) * 100) + "%";
      var label = document.createElement("div");
      label.className = "box-bar-label";
      label.textContent = b.label + " (" + b.val + ")";
      wrap.appendChild(fill);
      wrap.appendChild(label);
      boxBarsEl.appendChild(wrap);
    });

    var catProgressEl = document.getElementById("catProgress");
    catProgressEl.innerHTML = "";
    categories.forEach(function (cat) {
      var catIndices = VOCAB.map(function (c, i) { return i; }).filter(function (i) { return VOCAB[i].category === cat; });
      var known = catIndices.filter(function (i) {
        var p = getCardProgress(i, from, to);
        return p.box >= 2;
      }).length;
      var pct = catIndices.length ? Math.round((known / catIndices.length) * 100) : 0;

      var row = document.createElement("div");
      row.className = "cat-row";
      row.innerHTML =
        '<span class="cat-name">' + cat + '</span>' +
        '<span class="cat-track"><span class="cat-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="cat-pct">' + pct + '%</span>';
      catProgressEl.appendChild(row);
    });
  }

  document.getElementById("resetProgressBtn").addEventListener("click", function () {
    if (!confirm("Wirklich den gesamten Lernfortschritt löschen?")) return;
    state.progress = {};
    saveProgress();
    renderStats();
    buildSession();
  });

  // ---------- reference ----------

  function renderReference() {
    var timelineEl = document.getElementById("timeline");
    (window.CAREER_TIMELINE || []).forEach(function (step) {
      var el = document.createElement("div");
      el.className = "timeline-step";
      el.innerHTML =
        '<div class="ts-age">' + step.age + '</div>' +
        '<div class="ts-stage">' + step.stage + '</div>' +
        '<div class="ts-goal">' + step.goal + '</div>';
      timelineEl.appendChild(el);
    });

    var outlineEl = document.getElementById("topicOutline");
    (window.TOPIC_OUTLINE || []).forEach(function (block) {
      var section = document.createElement("div");
      section.className = "topic-block";
      var html = "<h3>" + block.title + "</h3><ul>";
      block.items.forEach(function (item) {
        html += "<li>" + item.text;
        if (item.sub && item.sub.length) {
          html += "<ul>" + item.sub.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>";
        }
        html += "</li>";
      });
      html += "</ul>";
      section.innerHTML = html;
      outlineEl.appendChild(section);
    });
  }

  // ---------- init ----------

  buildSession();
  buildQuiz();
  renderReference();
  } // end start()
})();
