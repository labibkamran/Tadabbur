/**
 * ProgressDots — onboarding header progress. The active step is an elongated brand pill.
 */

import { cn } from "@/lib/utils";
import { View } from "react-native";

export function ProgressDots({ total, index }: { total: number; index: number }) {
  return (
    <View
      className="flex-row items-center justify-center gap-1.5"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: total, now: index + 1 }}
      accessibilityLabel={`Step ${index + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={cn(
            "h-1.5 rounded-full",
            i === index ? "w-[18px] bg-brand" : "w-1.5 bg-surface-divider"
          )}
        />
      ))}
    </View>
  );
}
