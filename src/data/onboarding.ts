/**
 * The four onboarding questions, in order. One component renders all of them.
 * Every option is aspirational — no choice is a failure state.
 */

import type { OnboardingQuestionConfig } from "@/types/onboarding";

export const ONBOARDING_QUESTIONS: OnboardingQuestionConfig[] = [
  {
    key: "age",
    title: "How old are you?",
    select: "single",
    options: [
      { value: "under18", label: "Under 18" },
      { value: "18-24", label: "18–24" },
      { value: "25-34", label: "25–34" },
      { value: "35-49", label: "35–49" },
      { value: "50+", label: "50+" },
    ],
  },
  {
    key: "journey",
    title: "Where are you right now?",
    select: "single",
    options: [
      { value: "curious", label: "Just curious" },
      { value: "returning", label: "Returning after a while" },
      { value: "practicing", label: "Practicing" },
      { value: "studying", label: "Studying deeply" },
    ],
  },
  {
    key: "intent",
    title: "What brings you here?",
    helper: "Choose any that fit.",
    select: "multi",
    options: [
      { value: "guidance", label: "Guidance" },
      { value: "anxiety", label: "Anxiety" },
      { value: "gratitude", label: "Gratitude" },
      { value: "doubt", label: "Doubt" },
      { value: "learning", label: "Learning" },
      { value: "grief", label: "Grief" },
    ],
  },
  {
    key: "translation",
    title: "Which translation?",
    select: "single",
    initial: ["saheeh"],
    options: [
      { value: "saheeh", label: "Saheeh International", badge: "DEFAULT" },
      { value: "pickthall", label: "Pickthall" },
      { value: "yusufali", label: "Yusuf Ali" },
    ],
  },
];

export const PERSONALIZING_LINES = [
  "Preparing your space…",
  "Loading Saheeh International…",
  "Choosing your first reflections…",
];
