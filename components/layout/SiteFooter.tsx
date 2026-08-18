"use client";

import { startIntroTour } from "@/components/tour/ProductTour";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted">
        <p>
          Torwart Akademie · Lernplattform für Torhüter, Eltern und Trainer.
          Manche Links auf dieser Seite sind Affiliate-Links und als
          &bdquo;Werbung&ldquo; gekennzeichnet.
        </p>
        <button
          onClick={startIntroTour}
          className="shrink-0 underline-offset-2 hover:text-ink hover:underline"
        >
          Erste-Schritte-Tour
        </button>
      </div>
    </footer>
  );
}
