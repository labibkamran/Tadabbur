/**
 * Sakina — the nine feelings and their sessions, bundled. Curated, no model call.
 * Each feeling carries a gentle line of recognition, not a description. The full
 * 9 x 3 session set is filled in the curation pass; `anxious` is the working starter.
 */

import type { SessionEntry } from "@/types/sakina";

export const FEELINGS = [
  { key: "anxious", line: "when the mind won't settle" },
  { key: "lost", line: "when the way isn't clear" },
  { key: "grateful", line: "when there's something to thank Him for" },
  { key: "ashamed", line: "when you wish you'd done better" },
  { key: "alone", line: "when no one feels near" },
  { key: "angry", line: "when something isn't right" },
  { key: "afraid", line: "when the fear is loud" },
  { key: "tired", line: "when you've nothing left" },
  { key: "overwhelmed", line: "when it's all too much" },
  { key: "hopeful", line: "when a little light returns" },
] as const;

export type Emotion = (typeof FEELINGS)[number]["key"];

/**
 * VERIFY BEFORE SHIPPING: every `arabic` and `repeat` string below is a starter
 * rendering and must be checked against a reliable mushaf (quran.com / Tanzil /
 * KFGQPC) and reviewed by someone qualified. A wrong mark in the Qur'an is the one
 * error this app must never make. Citations are exact so the check is copy-paste.
 */
export const SESSIONS: Partial<Record<Emotion, SessionEntry[]>> = {
  anxious: [
    {
      verse: {
        chapter: 13,
        verse: 28,
        surah: "Ar-Ra'd",
        arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
        translation: "Unquestionably, by the remembrance of Allah hearts are assured.",
        translator: "Saheeh International",
      },
      repeat: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
      count: 7,
      question: "What can you leave in Allah's hands tonight?",
    },
  ],
  lost: [
    {
      verse: {
        chapter: 1,
        verse: 6,
        surah: "Al-Fatihah",
        arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
        translation: "Guide us to the straight path.",
        translator: "Saheeh International",
      },
      repeat: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      count: 7,
      question: "Where do you need to be led right now?",
    },
  ],
  grateful: [
    {
      verse: {
        chapter: 14,
        verse: 7,
        surah: "Ibrahim",
        arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
        translation: "If you are grateful, I will surely increase you.",
        translator: "Saheeh International",
      },
      repeat: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      count: 7,
      question: "What small mercy will you name tonight?",
    },
  ],
  ashamed: [
    {
      verse: {
        chapter: 39,
        verse: 53,
        surah: "Az-Zumar",
        arabic: "لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ",
        translation: "Do not despair of the mercy of Allah.",
        translator: "Saheeh International",
      },
      repeat: "لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ",
      count: 7,
      question: "What would you like to return from?",
    },
  ],
  alone: [
    {
      verse: {
        chapter: 57,
        verse: 4,
        surah: "Al-Hadid",
        arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
        translation: "And He is with you wherever you are.",
        translator: "Saheeh International",
      },
      repeat: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
      count: 7,
      question: "What would ease the aloneness tonight?",
    },
  ],
  angry: [
    {
      verse: {
        chapter: 3,
        verse: 134,
        surah: "Ali 'Imran",
        arabic: "وَٱلْكَٰظِمِينَ ٱلْغَيْظَ وَٱلْعَافِينَ عَنِ ٱلنَّاسِ",
        translation: "...who restrain anger and who pardon the people.",
        translator: "Saheeh International",
      },
      repeat: "وَٱلْكَٰظِمِينَ ٱلْغَيْظَ",
      count: 5,
      question: "What could you let go of, just for now?",
    },
  ],
  afraid: [
    {
      verse: {
        chapter: 3,
        verse: 173,
        surah: "Ali 'Imran",
        arabic: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ",
        translation: "Sufficient for us is Allah, and He is the best disposer of affairs.",
        translator: "Saheeh International",
      },
      repeat: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ",
      count: 7,
      question: "What would you place in Allah's care?",
    },
  ],
  tired: [
    {
      verse: {
        chapter: 65,
        verse: 3,
        surah: "At-Talaq",
        arabic: "وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥ",
        translation: "And whoever relies upon Allah, then He is sufficient for him.",
        translator: "Saheeh International",
      },
      repeat: "وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥ",
      count: 5,
      question: "What can you set down before you rest?",
    },
  ],
  overwhelmed: [
    {
      verse: {
        chapter: 21,
        verse: 87,
        surah: "Al-Anbiya",
        arabic: "لَّا إِلَٰهَ إِلَّآ أَنتَ سُبْحَٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّٰلِمِينَ",
        translation:
          "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        translator: "Saheeh International",
      },
      repeat: "لَّا إِلَٰهَ إِلَّآ أَنتَ سُبْحَٰنَكَ",
      count: 5,
      question: "What is weighing the most right now?",
    },
  ],
  hopeful: [
    {
      verse: {
        chapter: 12,
        verse: 87,
        surah: "Yusuf",
        arabic: "لَا تَيْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ",
        translation: "Do not despair of relief from Allah.",
        translator: "Saheeh International",
      },
      repeat: "لَا تَيْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ",
      count: 7,
      question: "What good are you hoping for?",
    },
  ],
};

/**
 * One session for a feeling, chosen at random from its set so a repeat differs.
 * Falls back to `anxious` until the full set is curated, so no tap ever breaks.
 */
export function getSessionEntry(emotion: string | undefined): SessionEntry {
  const entries = (emotion && SESSIONS[emotion as Emotion]) || SESSIONS.anxious!;
  return entries[Math.floor(Math.random() * entries.length)];
}
