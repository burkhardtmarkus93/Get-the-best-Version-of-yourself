"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PLANS,
  SUBSCRIPTIONS_LIVE,
  TRIAL_DAYS,
  effectiveMonthly,
  formatEuro,
  yearlySavings,
  type BillingInterval,
  type PlanKey,
} from "@/lib/plans";

// Reihenfolge bewusst so: Spieler steht in der Mitte und ist hervorgehoben,
// weil es das Kernangebot ist. Eltern links (günstigster Einstieg), Trainer
// rechts (umfangreichster Zugang).
const ORDER: PlanKey[] = ["eltern", "spieler", "trainer"];
const HIGHLIGHT: PlanKey = "spieler";

export function PricingTable() {
  const [interval, setInterval] = useState<BillingInterval>("monatlich");
  const yearly = interval === "jaehrlich";

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Abrechnungszeitraum"
          className="inline-flex rounded-full border border-line bg-surface p-1"
        >
          {(
            [
              ["monatlich", "Monatlich"],
              ["jaehrlich", "Jährlich"],
            ] as [BillingInterval, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setInterval(value)}
              aria-pressed={interval === value}
              className={
                "rounded-full px-5 py-2 text-sm font-medium transition-colors " +
                (interval === value
                  ? "bg-pitch-bright text-ink hover:brightness-95"
                  : "text-muted hover:text-ink")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-muted">
        {yearly
          ? "Zwei Monate geschenkt gegenüber monatlicher Zahlung."
          : "Monatlich kündbar. Im Jahresabo sind zwei Monate geschenkt."}
      </p>

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-3">
        {ORDER.map((key) => {
          const plan = PLANS[key];
          const highlighted = key === HIGHLIGHT;

          return (
            <div
              key={key}
              className={
                "card flex h-full flex-col " +
                (highlighted ? "border-pitch/60 lg:-mt-3 lg:pb-8" : "")
              }
            >
              {highlighted && (
                <span className="badge mb-3 self-start">Kernangebot</span>
              )}

              <h2 className="text-xl text-ink">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>

              <p className="mt-5">
                <span className="text-3xl font-semibold text-ink">
                  {formatEuro(
                    yearly ? effectiveMonthly(plan) : plan.priceMonthly
                  )}
                </span>
                <span className="text-sm text-muted"> / Monat</span>
              </p>
              <p className="mt-1 text-xs text-muted">
                {yearly ? (
                  <>
                    {formatEuro(plan.priceYearly)} jährlich · du sparst{" "}
                    {formatEuro(yearlySavings(plan))}
                  </>
                ) : (
                  <>Monatlich abgerechnet, jederzeit kündbar</>
                )}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm text-ink">
                    <span aria-hidden className="mt-0.5 text-pitch-deep">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/konto"
                className={
                  "mt-7 " + (highlighted ? "btn-primary" : "btn-ghost")
                }
              >
                {SUBSCRIPTIONS_LIVE
                  ? `${TRIAL_DAYS} Tage kostenlos testen`
                  : "Konto anlegen"}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
