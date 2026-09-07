"use client";

import Link from "next/link";
import { startIntroTour } from "@/components/tour/ProductTour";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-bar-line bg-bar">
      <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-bar-muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline-offset-2 hover:text-bar-ink hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={startIntroTour}
            className="shrink-0 underline-offset-2 hover:text-bar-ink hover:underline"
          >
            Erste-Schritte-Tour
          </button>
        </div>
        <p className="mt-4">
          Talent Catcher Academy · Lernplattform für Torhüter, Eltern und Trainer.
          Manche Links auf dieser Seite sind Affiliate-Links und als
          &bdquo;Werbung&ldquo; gekennzeichnet.
        </p>
      </div>
    </footer>
  );
}
