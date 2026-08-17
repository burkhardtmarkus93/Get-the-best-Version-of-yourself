"use client";

import { useEffect, useMemo, useState } from "react";
import type { VocabCard } from "@/lib/vocab/data";
import { AffiliateCallout } from "@/components/affiliate/AffiliateCallout";

type Lang = "de" | "en" | "pt" | "es";
type Tab = "cards" | "quiz" | "stats";

const LANG_NAMES: Record<Lang, string> = {
  de: "Deutsch",
  en: "Englisch",
  pt: "Portugiesisch",
  es: "Spanisch",
};

const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16];
const BOX_LABELS = ["Neu / Box 1", "Box 2", "Box 3", "Box 4", "Box 5 (gelernt)"];

type CardProgress = { box: number; due: number; seen: number };
type Progress = Record<string, CardProgress>;
type Prefs = { from: Lang; to: Lang; categories: string[] };

const STORAGE_KEY = "vocabTrainer.progress.v1";
const PREF_KEY = "vocabTrainer.prefs.v1";

function progressKey(cardIndex: number, from: Lang, to: Lang) {
  return `${cardIndex}_${from}_${to}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function VocabTrainer({ cards }: { cards: VocabCard[] }) {
  const categories = useMemo(
    () => Array.from(new Set(cards.map((c) => c.category))).sort(),
    [cards]
  );

  const [tab, setTab] = useState<Tab>("cards");
  const [prefs, setPrefs] = useState<Prefs>({
    from: "de",
    to: "en",
    categories,
  });
  const [progress, setProgress] = useState<Progress>({});
  const [hydrated, setHydrated] = useState(false);

  // Fortschritt/Präferenzen kommen aus localStorage — das kann erst nach
  // dem Mount passieren (kein window auf dem Server). Standardwerte oben
  // matchen das serverseitig gerenderte HTML, damit es keinen
  // Hydration-Mismatch gibt.
  useEffect(() => {
    try {
      const rawPrefs = localStorage.getItem(PREF_KEY);
      if (rawPrefs) {
        const p = JSON.parse(rawPrefs);
        setPrefs({
          from: p.from || "de",
          to: p.to || "en",
          categories: p.categories?.length ? p.categories : categories,
        });
      }
      const rawProgress = localStorage.getItem(STORAGE_KEY);
      if (rawProgress) setProgress(JSON.parse(rawProgress));
    } catch {
      // localStorage nicht verfügbar (z.B. Privatmodus) — Defaults bleiben.
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs, hydrated]);

  function saveProgress(next: Progress) {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function getCardProgress(cardIndex: number, from: Lang, to: Lang): CardProgress {
    return progress[progressKey(cardIndex, from, to)] || { box: 0, due: 0, seen: 0 };
  }

  function rateCard(cardIndex: number, correct: boolean) {
    const { from, to } = prefs;
    const p = getCardProgress(cardIndex, from, to);
    const now = Date.now();
    const box = correct ? Math.min(p.box + 1, BOX_INTERVAL_DAYS.length - 1) : 0;
    const due = now + BOX_INTERVAL_DAYS[box] * 86400000;
    const next = {
      ...progress,
      [progressKey(cardIndex, from, to)]: { box, due, seen: (p.seen || 0) + 1 },
    };
    saveProgress(next);
  }

  const filteredIndices = useMemo(
    () => cards.map((c, i) => i).filter((i) => prefs.categories.includes(cards[i].category)),
    [cards, prefs.categories]
  );

  function toggleCategory(cat: string) {
    setPrefs((p) => {
      const has = p.categories.includes(cat);
      if (has && p.categories.length === 1) return p;
      return {
        ...p,
        categories: has
          ? p.categories.filter((c) => c !== cat)
          : [...p.categories, cat],
      };
    });
  }

  return (
    <div>
      <div className="card flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted">
            Von
          </label>
          <select
            className="select-field"
            value={prefs.from}
            onChange={(e) => {
              const from = e.target.value as Lang;
              setPrefs((p) => ({ ...p, from, to: from === p.to ? otherLang(from) : p.to }));
            }}
          >
            {(Object.keys(LANG_NAMES) as Lang[]).map((l) => (
              <option key={l} value={l}>
                {LANG_NAMES[l]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted">
            Nach
          </label>
          <select
            className="select-field"
            value={prefs.to}
            onChange={(e) => setPrefs((p) => ({ ...p, to: e.target.value as Lang }))}
          >
            {(Object.keys(LANG_NAMES) as Lang[])
              .filter((l) => l !== prefs.from)
              .map((l) => (
                <option key={l} value={l}>
                  {LANG_NAMES[l]}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted">
            Kategorien
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                  (prefs.categories.includes(cat)
                    ? "border-pitch bg-pitch-dim text-pitch"
                    : "border-line bg-surface2 text-muted hover:text-ink")
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-1.5">
        {(
          [
            ["cards", "Karteikarten"],
            ["quiz", "Quiz"],
            ["stats", "Statistik"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={
              "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
              (tab === id
                ? "bg-pitch text-paper"
                : "border border-line text-muted hover:text-ink")
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "cards" && (
          <FlashcardsTab
            cards={cards}
            indices={filteredIndices}
            prefs={prefs}
            getCardProgress={getCardProgress}
            rateCard={rateCard}
          />
        )}
        {tab === "quiz" && (
          <QuizTab cards={cards} indices={filteredIndices} prefs={prefs} rateCard={rateCard} />
        )}
        {tab === "stats" && (
          <StatsTab
            cards={cards}
            categories={categories}
            prefs={prefs}
            getCardProgress={getCardProgress}
          />
        )}
      </div>

      <div className="mt-10">
        <AffiliateCallout />
      </div>
    </div>
  );
}

function otherLang(exclude: Lang): Lang {
  return (Object.keys(LANG_NAMES) as Lang[]).find((l) => l !== exclude) || "en";
}

function FlashcardsTab({
  cards,
  indices,
  prefs,
  getCardProgress,
  rateCard,
}: {
  cards: VocabCard[];
  indices: number[];
  prefs: Prefs;
  getCardProgress: (i: number, from: Lang, to: Lang) => CardProgress;
  rateCard: (i: number, correct: boolean) => void;
}) {
  const [session, setSession] = useState<number[]>([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function buildSession() {
    const now = Date.now();
    const due: { i: number; due: number }[] = [];
    const fresh: number[] = [];
    indices.forEach((i) => {
      const p = getCardProgress(i, prefs.from, prefs.to);
      if (p.seen === 0) fresh.push(i);
      else if (p.due <= now) due.push({ i, due: p.due });
    });
    due.sort((a, b) => a.due - b.due);
    const ordered = due.map((d) => d.i).concat(shuffle(fresh));
    setSession(ordered.slice(0, 30));
    setSessionIndex(0);
    setFlipped(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(buildSession, [indices.join(","), prefs.from, prefs.to]);

  const current = session[sessionIndex] !== undefined ? cards[session[sessionIndex]] : null;

  function rate(correct: boolean) {
    if (session[sessionIndex] === undefined) return;
    rateCard(session[sessionIndex], correct);
    setSessionIndex((i) => i + 1);
    setFlipped(false);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-muted">
        <span>
          {session.length} Karte{session.length === 1 ? "" : "n"} fällig
        </span>
        <button className="btn-ghost" onClick={buildSession}>
          Neu mischen
        </button>
      </div>

      <div className="flex justify-center">
        {current ? (
          <div
            className="flex h-64 w-full max-w-md cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-gradient-to-br from-surface to-surface2 p-6 text-center"
            onClick={() => setFlipped((f) => !f)}
          >
            <span className="badge">{current.category}</span>
            <p className="text-2xl font-semibold text-ink">
              {flipped ? current[prefs.to] : current[prefs.from]}
            </p>
            <span className="text-xs text-muted">
              {flipped
                ? `${LANG_NAMES[prefs.from]} → ${LANG_NAMES[prefs.to]}`
                : "Tippen zum Umdrehen"}
            </span>
          </div>
        ) : (
          <p className="max-w-md py-16 text-center text-muted">
            🎉 Keine Karten fällig für diese Auswahl. Wähle andere
            Kategorien oder komm später wieder.
          </p>
        )}
      </div>

      {current && flipped && (
        <div className="mx-auto mt-4 flex max-w-md gap-3">
          <button
            className="flex-1 rounded-lg border border-brick bg-brick-dim px-4 py-3 text-sm font-semibold text-brick"
            onClick={() => rate(false)}
          >
            ❌ Wusste ich nicht
          </button>
          <button
            className="flex-1 rounded-lg border border-pitch bg-pitch-dim px-4 py-3 text-sm font-semibold text-pitch"
            onClick={() => rate(true)}
          >
            ✅ Wusste ich
          </button>
        </div>
      )}
    </div>
  );
}

function QuizTab({
  cards,
  indices,
  prefs,
  rateCard,
}: {
  cards: VocabCard[];
  indices: number[];
  prefs: Prefs;
  rateCard: (i: number, correct: boolean) => void;
}) {
  const [pool, setPool] = useState<number[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  function buildQuiz() {
    const p = shuffle(indices).slice(0, 15);
    setPool(p);
    setQIndex(0);
    setCorrect(0);
    setTotal(0);
    setAnswered(null);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(buildQuiz, [indices.join(","), prefs.from, prefs.to]);

  const currentCardIndex = pool[qIndex];
  const currentCard = currentCardIndex !== undefined ? cards[currentCardIndex] : null;

  useEffect(() => {
    if (currentCardIndex === undefined || !currentCard) return;
    const sameCategory = indices.filter(
      (i) =>
        i !== currentCardIndex &&
        cards[i].category === currentCard.category &&
        cards[i][prefs.to] !== currentCard[prefs.to]
    );
    const otherAny = indices.filter(
      (i) => i !== currentCardIndex && cards[i][prefs.to] !== currentCard[prefs.to]
    );
    const source = sameCategory.length >= 3 ? sameCategory : otherAny;
    const distractors = shuffle(source)
      .slice(0, 3)
      .map((i) => cards[i][prefs.to]);
    setOptions(shuffle([currentCard[prefs.to], ...distractors]));
    setAnswered(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCardIndex, prefs.to]);

  if (indices.length < 4) {
    return (
      <p className="card text-center text-muted">
        Wähle mindestens eine Kategorie, um das Quiz zu starten.
      </p>
    );
  }

  function choose(opt: string) {
    if (answered || !currentCard || currentCardIndex === undefined) return;
    setAnswered(opt);
    setTotal((t) => t + 1);
    const isCorrect = opt === currentCard[prefs.to];
    if (isCorrect) setCorrect((c) => c + 1);
    rateCard(currentCardIndex, isCorrect);
    setTimeout(() => setQIndex((i) => i + 1), 1100);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-muted">
        <span>
          {correct} / {total}
        </span>
        <button className="btn-ghost" onClick={buildQuiz}>
          Quiz neu starten
        </button>
      </div>

      <div className="card text-center">
        {currentCard ? (
          <>
            <span className="badge">{currentCard.category}</span>
            <p className="mt-3 text-xl font-semibold text-ink">
              {currentCard[prefs.from]}
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {options.map((opt) => {
                const isCorrectOpt = opt === currentCard[prefs.to];
                const showState = answered !== null;
                return (
                  <button
                    key={opt}
                    disabled={showState}
                    onClick={() => choose(opt)}
                    className={
                      "rounded-lg border px-3 py-3 text-left text-sm transition-colors " +
                      (showState && isCorrectOpt
                        ? "border-pitch bg-pitch-dim text-pitch"
                        : showState && opt === answered
                        ? "border-brick bg-brick-dim text-brick"
                        : "border-line bg-surface2 text-ink hover:border-pitch/50")
                    }
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className="mt-4 text-sm text-muted">
                {answered === currentCard[prefs.to]
                  ? "Richtig!"
                  : `Richtige Antwort: ${currentCard[prefs.to]}`}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-xl font-semibold text-ink">Runde beendet! 🎉</p>
            <p className="mt-2 text-sm text-muted">
              Ergebnis: {correct} von {total} richtig.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function StatsTab({
  cards,
  categories,
  prefs,
  getCardProgress,
}: {
  cards: VocabCard[];
  categories: string[];
  prefs: Prefs;
  getCardProgress: (i: number, from: Lang, to: Lang) => CardProgress;
}) {
  const indices = cards.map((c, i) => i).filter((i) => prefs.categories.includes(cards[i].category));

  const boxCounts = [0, 0, 0, 0, 0];
  indices.forEach((i) => {
    const p = getCardProgress(i, prefs.from, prefs.to);
    if (p.seen > 0) boxCounts[p.box] += 1;
  });
  const unseen = indices.length - boxCounts.reduce((a, b) => a + b, 0);
  const maxVal = Math.max(...boxCounts, unseen, 1);
  const bars = [{ label: "Ungesehen", val: unseen }].concat(
    BOX_LABELS.map((label, idx) => ({ label, val: boxCounts[idx] }))
  );

  return (
    <div>
      <h2 className="text-lg font-semibold text-ink">Lernfortschritt</h2>
      <p className="mt-1 text-sm text-muted">
        Fortschritt für Richtung{" "}
        <strong className="text-ink">
          {LANG_NAMES[prefs.from]} → {LANG_NAMES[prefs.to]}
        </strong>
        , basierend auf dem Leitner-System (5 Boxen).
      </p>

      <div className="card mt-5 flex h-40 items-end gap-2">
        {bars.map((b) => (
          <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <div
              className="w-full rounded-t bg-pitch"
              style={{ height: `${Math.max(3, (b.val / maxVal) * 100)}%` }}
            />
            <span className="text-center text-[10px] text-muted">
              {b.label} ({b.val})
            </span>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-base font-semibold text-ink">
        Fortschritt je Kategorie
      </h3>
      <div className="mt-3 flex flex-col gap-2.5">
        {categories.map((cat) => {
          const catIndices = cards.map((c, i) => i).filter((i) => cards[i].category === cat);
          const known = catIndices.filter((i) => getCardProgress(i, prefs.from, prefs.to).box >= 2).length;
          const pct = catIndices.length ? Math.round((known / catIndices.length) * 100) : 0;
          return (
            <div key={cat} className="flex items-center gap-3">
              <span className="w-44 shrink-0 text-sm text-ink">{cat}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface2">
                <span className="block h-full bg-pitch" style={{ width: `${pct}%` }} />
              </span>
              <span className="w-10 shrink-0 text-right text-xs text-muted">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
