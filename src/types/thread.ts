/**
 * A thread is a list of turns. A user turn is plain text; an assistant turn is a
 * generated reflection (Inter prose) plus the verses it points to. Never mixed.
 */

import type { Verse } from "@/types/verse";

export type Answer = { prose: string; verses: Verse[] };

export type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; answer: Answer; stream: boolean };

export type HistoryItem = { id: string; question: string; when: string };
