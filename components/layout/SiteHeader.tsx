import Link from "next/link";

const navItems = [
  { href: "/torhueter", label: "Für Torhüter" },
  { href: "/eltern", label: "Für Eltern" },
  { href: "/trainer", label: "Für Trainer" },
  { href: "/konto", label: "Mein Konto" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-lg font-semibold text-ink">
          🧤 Torwart Akademie
        </Link>
        <nav className="flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
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
