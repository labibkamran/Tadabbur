/**
 * A single Qur'anic verse: the Arabic, its translation, and where it comes from.
 * The translator is always named — a translation belongs to someone.
 */

export type Verse = {
  chapter: number;
  verse: number;
  surah: string;
  arabic: string;
  translation: string;
  translator: string;
};
