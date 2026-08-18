import { getAllVocabCards } from "@/lib/vocab/data";
import { VocabTrainer } from "@/components/vocab/VocabTrainer";

export const metadata = {
  title: "Fußballwörter Trainer · Torwart Akademie",
};

export default function VokabelnPage() {
  const cards = getAllVocabCards();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">
        ⚽ Fußballwörter Trainer
      </h1>
      <p className="mt-2 text-sm text-muted">
        {cards.length} Fachbegriffe aus 13 Kategorien. Fortschritt wird
        lokal in diesem Browser gespeichert — mit{" "}
        <a href="/konto" className="underline hover:text-ink">
          Konto
        </a>{" "}
        geräteübergreifend.
      </p>

      <div className="mt-8">
        <VocabTrainer cards={cards} />
      </div>
    </div>
  );
}
