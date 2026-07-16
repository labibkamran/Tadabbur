/**
 * WeekStrip — a record of returning, not a target. Seven dots, M–S. Opened days
 * fill brass, today is ringed. No number, no streak, nothing to break.
 */

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { View } from "react-native";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function WeekStrip({ opened, todayIndex }: { opened: boolean[]; todayIndex: number }) {
  const count = opened.filter(Boolean).length;
  return (
    <View
      className="flex-row justify-between px-2"
      accessibilityLabel={`Opened on ${count} of the last 7 days`}
    >
      {DAYS.map((day, i) => (
        <View key={i} className="items-center gap-2">
          <Text variant="caption" className="text-text-muted">
            {day}
          </Text>
          <View className="h-4 justify-center">
            {i === todayIndex ? (
              <View className="size-4 items-center justify-center rounded-full border-2 border-brass">
                <View className="size-2 rounded-full bg-brass" />
              </View>
            ) : (
              <View
                className={cn(
                  "size-2.5 rounded-full",
                  opened[i] ? "bg-brass" : "bg-surface-divider"
                )}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
