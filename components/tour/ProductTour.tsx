"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { TourStep } from "@/lib/tour/steps";

const SEEN_KEY = "torwartAkademie.tourSeen.v1";

// Andere Komponenten lösen den erneuten Start (z. B. der Footer-Link
// "Erste-Schritte-Tour") über dieses window-Event aus, statt über Props/
// Context — ProductTour und SiteFooter sind Geschwister-Komponenten ohne
// gemeinsamen Client-State, und ein globales Event ist hier einfacher
// als extra Context-Plumbing nur für diesen einen Trigger.
const START_EVENT = "start-intro-tour";

export function startIntroTour() {
  window.dispatchEvent(new Event(START_EVENT));
}

export function ProductTour({ steps }: { steps: TourStep[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const step = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  // Autostart erst nach dem Mount prüfen (kein window/localStorage auf dem
  // Server) — vermeidet einen Hydration-Mismatch, da der Server immer
  // "inaktiv" rendert.
  useEffect(() => {
    try {
      if (!localStorage.getItem(SEEN_KEY)) setActive(true);
    } catch {
      /* localStorage nicht verfügbar — Tour bleibt einfach inaktiv */
    }
  }, []);

  useEffect(() => {
    function onStart() {
      setStepIndex(0);
      setActive(true);
    }
    window.addEventListener(START_EVENT, onStart);
    return () => window.removeEventListener(START_EVENT, onStart);
  }, []);

  useEffect(() => {
    if (active && step.path && step.path !== pathname) {
      router.push(step.path);
    }
  }, [active, step, pathname, router]);

  useEffect(() => {
    if (!active) {
      setRect(null);
      return;
    }

    let cancelled = false;
    let frame: number;

    function measure() {
      if (!step.targetId) {
        if (!cancelled) setRect(null);
        return;
      }
      const el = document.querySelector<HTMLElement>(
        `[data-tour-id="${step.targetId}"]`
      );
      if (!el) {
        frame = requestAnimationFrame(measure);
        return;
      }
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => {
        if (!cancelled) setRect(el.getBoundingClientRect());
      }, 200);
    }

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, step]);

  const handleClose = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, handleClose]);

  if (!active) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" aria-hidden />
      {rect ? (
        <div
          className="pointer-events-none fixed z-40 rounded-xl border-2 border-pitch transition-all duration-300"
          style={{
            top: rect.top - 8,
            left: rect.left - 8,
            width: rect.width + 16,
            height: rect.height + 16,
            boxShadow: "0 0 0 9999px rgba(15, 19, 16, 0.75)",
          }}
        />
      ) : (
        <div className="fixed inset-0 z-40 bg-paper/80" aria-hidden />
      )}

      <div
        role="dialog"
        aria-label="Erste-Schritte-Tour"
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-xl border border-line bg-surface p-5 shadow-lg sm:inset-x-auto sm:bottom-8 sm:right-8"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            Schritt {stepIndex + 1} von {steps.length}
          </span>
          <button
            onClick={handleClose}
            aria-label="Tour schließen"
            className="rounded-md p-1 text-muted transition-colors hover:bg-pitch-dim hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <h3 className="font-display text-lg font-medium text-ink">{step.title}</h3>
        <p className="mt-1.5 text-sm text-muted">{step.body}</p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            className="text-xs text-muted underline-offset-2 hover:underline"
          >
            Überspringen
          </button>
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-pitch-dim"
              >
                Zurück
              </button>
            )}
            <button
              onClick={() => {
                if (isLast) handleClose();
                else setStepIndex((i) => i + 1);
              }}
              className="rounded-lg bg-pitch px-3 py-1.5 text-xs font-medium text-paper shadow-sm transition-colors hover:bg-pitch-dark"
            >
              {isLast ? "Los geht's" : "Weiter"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
