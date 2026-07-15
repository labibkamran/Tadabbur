/**
 * Onboarding stack — the pre-auth funnel. Headerless, no tab bar, and a single
 * fade between screens so the funnel reads as one surface. Fade is opacity-only,
 * so it stays reduced-motion safe.
 */

import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        animationTypeForReplace: "push",
      }}
    />
  );
}
