import { getAllVocabCards } from "@/lib/vocab/data";
import { VocabTrainer } from "@/components/vocab/VocabTrainer";
import { Piktogramm } from "@/components/brand/Piktogramm";

export const metadata = {
  title: "Fußballwörter Trainer",
};

export default function VokabelnPage() {
  const cards = getAllVocabCards();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center gap-3">
        <Piktogramm name="sprache" />
        <h1 className="text-2xl text-ink">Fußballwörter Trainer</h1>
      </div>
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
