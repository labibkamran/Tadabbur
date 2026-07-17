/**
 * Surah metadata for the index, and the shape of one ayah in the reader. The reader's
 * ayah carries only its number, Arabic, and translation; the translator is one constant.
 */

export type SurahMeta = {
  number: number;
  name: string;
  englishName: string;
  meaning: string;
  ayahs: number;
  revelation: "Meccan" | "Medinan";
};

export type AyahText = { verse: number; arabic: string; translation: string };
