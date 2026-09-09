import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE_NAME } from "@/lib/brand/config";

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
      {/* Auf schmalen Displays untereinander: Wortmarke und Navigation
          passen sonst nicht nebeneinander und die Seite ließe sich
          seitlich verschieben. */}
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <Link
          href="/"
          aria-label={`${SITE_NAME} — zur Startseite`}
          className="shrink-0"
        >
          <Wordmark grund="hell" />
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
