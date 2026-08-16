import { coachingLicenses, coachingTopics } from "@/lib/career/coaching-topics";

export const metadata = { title: "Für Trainer · Torwart Akademie" };

export default function TrainerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">Für Trainer</h1>
      <p className="mt-2 text-muted">
        Für Trainer:innen, die sich für Torwarttraining interessieren —
        egal ob als Einstieg oder Vertiefung neben der Feldspieler-Lizenz.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-ink">
        Lizenzwege Torspieler-Trainer
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {coachingLicenses.map((l) => (
          <li key={l} className="card py-3 text-sm text-ink">
            {l}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-ink">
        Themenbereiche
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {coachingTopics.map((t) => (
          <div key={t.title} className="card">
            <h3 className="font-semibold text-ink">{t.title}</h3>
            <p className="mt-2 text-sm text-muted">{t.body}</p>
          </div>
        ))}
      </div>

      <div className="card mt-10 opacity-70">
        <p className="text-sm text-muted">
          Trainingsformen, Arbeitsblätter und Video-Beispiele sind als
          Module in Planung.
        </p>
      </div>
    </div>
  );
}
