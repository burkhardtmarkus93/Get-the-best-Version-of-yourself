import Link from "next/link";

const navItems = [
  { href: "/torhueter", label: "Für Torhüter", tourId: "tour-nav-torhueter" },
  { href: "/eltern", label: "Für Eltern", tourId: "tour-nav-eltern" },
  { href: "/trainer", label: "Für Trainer", tourId: "tour-nav-trainer" },
  { href: "/preise", label: "Preise", tourId: "tour-nav-preise" },
  { href: "/konto", label: "Mein Konto", tourId: "tour-nav-konto" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      {/* Auf schmalen Displays untereinander und umbrechend: die
          Navigation passt sonst nicht in eine Zeile und die ganze Seite
          lässt sich seitlich verschieben. */}
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <Link href="/" className="font-display text-lg font-semibold text-ink">
          🧤 Torwart Akademie
        </Link>
        <nav className="-mx-1 flex flex-wrap gap-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-tour-id={item.tourId}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
