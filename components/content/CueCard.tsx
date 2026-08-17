export function CueCard({
  title,
  body,
  cues,
}: {
  title: string;
  body?: string;
  cues?: string[];
}) {
  return (
    <div className="card">
      <h3 className="font-semibold text-ink">{title}</h3>
      {body && <p className="mt-2 text-sm text-muted">{body}</p>}
      {cues && cues.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {cues.map((cue) => (
            <li key={cue} className="flex gap-2 text-sm text-ink">
              <span className="mt-0.5 text-pitch">•</span>
              <span>{cue}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
