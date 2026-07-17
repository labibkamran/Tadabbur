/**
 * AskHome suggestions and the single mocked answer the Thread streams back. Everything
 * generated lives here so the one seam that will become the real model call is obvious.
 */

import type { Answer, HistoryItem } from "@/types/thread";

export const ASK_SUGGESTIONS = [
  "I can't stop worrying about the future",
  "I keep making the same mistake",
  "How do I know what's right?",
  "What does the Qur'an say about patience?",
  "I feel far from Allah lately",
  "How do I forgive someone who hurt me?",
  "Why is this happening to me?",
  "I want to be more grateful",
];

/** Dummy past threads for HistorySheet until threads are actually persisted. */
export const ASK_HISTORY: HistoryItem[] = [
  { id: "h1", question: "I keep making the same mistake", when: "2 hours ago" },
  { id: "h2", question: "How do I forgive someone who hurt me?", when: "Yesterday" },
  { id: "h3", question: "What does the Qur'an say about patience?", when: "Yesterday" },
  { id: "h4", question: "I feel far from Allah lately", when: "3 days ago" },
  { id: "h5", question: "I can't stop worrying about the future", when: "Last week" },
  { id: "h6", question: "How do I know what's right?", when: "Last week" },
];

/**
 * VERIFY BEFORE SHIPPING: the two `arabic` strings below are the Qur'an and must be
 * checked against a reliable mushaf before they ship. This whole answer is a single
 * mocked model response, returned for every question, so the streaming UI can be built
 * before a backend exists. Replace the value at that one seam; the UI stays.
 */
export const ASK_MOCK_ANSWER: Answer = {
  prose:
    "Repeating the same mistake can make it feel like a door has closed. The Qur'an speaks of it differently. The first verse answers that despair directly, and the second describes the one who keeps turning back as loved, not only forgiven. Read them in full; they hold more than anything here.",
  verses: [
    {
      chapter: 39,
      verse: 53,
      surah: "Az-Zumar",
      arabic: "لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا",
      translation: "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins.",
      translator: "Saheeh International",
    },
    {
      chapter: 2,
      verse: 222,
      surah: "Al-Baqarah",
      arabic: "إِنَّ ٱللَّهَ يُحِبُّ ٱلتَّوَّٰبِينَ وَيُحِبُّ ٱلْمُتَطَهِّرِينَ",
      translation:
        "Indeed, Allah loves those who are constantly repentant and loves those who purify themselves.",
      translator: "Saheeh International",
    },
  ],
};
