/**
 * A Sakina session entry: a verse to sit with, its phrase to repeat, and a question
 * to carry. `count` is the suggested number of gentle repetitions.
 */

import type { Verse } from "@/types/verse";

export type SessionEntry = {
  verse: Verse;
  repeat: string;
  count: number;
  question: string;
};
