/**
 * SessionProgress — a thin brass line in segments, one per beat. Unobtrusive, so
 * you always know where you are without it feeling like a task bar.
 */

import { cn } from "@/lib/utils";
import { View } from "react-native";

export function SessionProgress({ beat, total }: { beat: number; total: number }) {
  return (
    <View className="flex-row gap-1.5" accessibilityLabel={`Beat ${beat + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={cn("h-[3px] flex-1 rounded-full", i <= beat ? "bg-brass" : "bg-surface-divider")}
        />
      ))}
    </View>
  );
}
