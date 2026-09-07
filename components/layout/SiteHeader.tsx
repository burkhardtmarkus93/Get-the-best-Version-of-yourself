import Image from "next/image";
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
    <header className="border-b border-bar-line bg-bar">
      {/* Auf schmalen Displays untereinander: Logo und Navigation passen
          sonst nicht nebeneinander und die Seite ließe sich seitlich
          verschieben. */}
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Logo in der dunklen Schriftfassung, passend zur weißen Kopfzeile.
            Die Datei liegt als PNG vor — das Ausgangslogo ist eine
            Pixelgrafik, es gibt keine Vektorquelle.
            shrink-0 ist nötig, sonst quetscht der Flex-Container das Bild
            auf schmalen Displays zusammen. */}
        <Link
          href="/"
          aria-label="Talent Catcher Academy — zur Startseite"
          className="shrink-0"
        >
          <Image
            src="/logo-quer-hell.png"
            alt="Talent Catcher Academy"
            width={839}
            height={168}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>
        <nav className="-mx-1 flex flex-wrap gap-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-tour-id={item.tourId}
              className="rounded-lg px-3 py-2 text-sm font-medium text-bar-muted transition-colors hover:bg-bar-hover hover:text-bar-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
