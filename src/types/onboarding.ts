/**
 * Types for the onboarding funnel — question configs and collected answers.
 */

export type OnboardingOption = {
  value: string;
  label: string;
  badge?: string;
};

export type OnboardingQuestionConfig = {
  key: string;
  title: string;
  helper?: string;
  select: "single" | "multi";
  options: OnboardingOption[];
  initial?: string[];
};

export type OnboardingAnswers = Record<string, string[]>;
