/**
 * The onboarding question flow — holds answers and steps through the four questions.
 * Single questions without a default auto-advance; hardware back steps within the flow.
 * Answers are collected in local state; persistence lands when AskHome consumes them.
 */

import { OnboardingQuestion } from "@/components/onboarding/onboardingQuestion";
import { ONBOARDING_QUESTIONS } from "@/data/onboarding";
import { goBack } from "@/lib/nav";
import type { OnboardingAnswers } from "@/types/onboarding";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";

const initialAnswers: OnboardingAnswers = Object.fromEntries(
  ONBOARDING_QUESTIONS.map((q) => [q.key, q.initial ?? []])
);

export default function Questions() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>(initialAnswers);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = ONBOARDING_QUESTIONS[step];
  const selected = answers[config.key];
  const isLast = step === ONBOARDING_QUESTIONS.length - 1;
  const autoAdvance = config.select === "single" && !(config.initial && config.initial.length > 0);

  const advance = () => {
    if (isLast) router.push("/personalizing");
    else setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 0) goBack("/");
    else setStep((s) => s - 1);
  };

  useEffect(() => {
    const onBack = () => {
      if (step > 0) {
        setStep((s) => s - 1);
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [step]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  const toggle = (value: string) => {
    setAnswers((prev) => {
      const current = prev[config.key];
      const next =
        config.select === "single"
          ? [value]
          : current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
      return { ...prev, [config.key]: next };
    });

    if (autoAdvance) {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(advance, 350);
    }
  };

  return (
    <OnboardingQuestion
      config={config}
      index={step}
      total={ONBOARDING_QUESTIONS.length}
      selected={selected}
      canContinue={selected.length > 0}
      showContinue={!autoAdvance}
      onToggle={toggle}
      onBack={back}
      onContinue={advance}
    />
  );
}
