import manifest from "./manifest.json";

import spielfeld from "./data/spielfeld.json";
import ausserhalbDesSpielfelds from "./data/ausserhalb-des-spielfelds.json";
import spieler from "./data/spieler.json";
import bekleidung from "./data/bekleidung.json";
import taktik from "./data/taktik.json";
import technik from "./data/technik.json";
import spielhandlung from "./data/spielhandlung.json";
import psyche from "./data/psyche.json";
import trainingsmaterial from "./data/trainingsmaterial.json";
import laender from "./data/laender.json";
import koerper from "./data/koerper.json";
import schiedsrichter from "./data/schiedsrichter.json";
import torwart from "./data/torwart.json";

export type VocabCard = {
  category: string;
  de: string;
  en: string;
  pt: string;
  es: string;
};

// Statischer Import statt Client-seitigem fetch() der ursprünglichen
// Standalone-Version: Next.js bündelt die JSON-Dateien zur Build-Zeit,
// wodurch das Modul ohne Netzwerk-Roundtrip startet.
const categoryFiles: Record<string, VocabCard[]> = {
  "vocab/spielfeld.json": spielfeld as VocabCard[],
  "vocab/ausserhalb-des-spielfelds.json": ausserhalbDesSpielfelds as VocabCard[],
  "vocab/spieler.json": spieler as VocabCard[],
  "vocab/bekleidung.json": bekleidung as VocabCard[],
  "vocab/taktik.json": taktik as VocabCard[],
  "vocab/technik.json": technik as VocabCard[],
  "vocab/spielhandlung.json": spielhandlung as VocabCard[],
  "vocab/psyche.json": psyche as VocabCard[],
  "vocab/trainingsmaterial.json": trainingsmaterial as VocabCard[],
  "vocab/laender.json": laender as VocabCard[],
  "vocab/koerper.json": koerper as VocabCard[],
  "vocab/schiedsrichter.json": schiedsrichter as VocabCard[],
  "vocab/torwart.json": torwart as VocabCard[],
};

export function getAllVocabCards(): VocabCard[] {
  return (manifest as { file: string }[]).flatMap(
    (entry) => categoryFiles[entry.file] ?? []
  );
}
