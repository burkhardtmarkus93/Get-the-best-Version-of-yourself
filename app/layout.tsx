import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductTour } from "@/components/tour/ProductTour";
import { INTRO_TOUR_STEPS } from "@/lib/tour/steps";
import { SITE_NAME } from "@/lib/brand/config";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

// 800 wird für die Wortmarke gebraucht (CAMPO), siehe Markenvorgabe.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Unterseiten setzen nur ihren eigenen Titel, der Markenname hängt die
  // Vorlage an — so steht er nicht in jeder Datei einzeln.
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Lernplattform für Torhüter, ihre Eltern und Trainer mit Interesse am Torwarttraining.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ProductTour steps={INTRO_TOUR_STEPS} />
      </body>
    </html>
  );
}
