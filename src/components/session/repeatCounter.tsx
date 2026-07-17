/**
 * RepeatCounter — a row of beads you tap once per recitation, like a tasbih. A gentle
 * tick each time. It fills and it never scores. The one place Sakina uses haptics.
 */

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import * as Haptics from "expo-haptics";
import { Pressable, View } from "react-native";

type RepeatCounterProps = {
  count: number;
  done: number;
  onTap: () => void;
};

export function RepeatCounter({ count, done, onTap }: RepeatCounterProps) {
  const complete = done >= count;

  const handle = () => {
    if (complete) return;
    Haptics.selectionAsync();
    onTap();
  };

  return (
    <Pressable
      onPress={handle}
      disabled={complete}
      accessibilityRole="button"
      accessibilityLabel={`Repeated ${done} of ${count}`}
      className="items-center gap-3 px-8 py-4 active:opacity-80"
    >
      <View className="flex-row gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={i}
            className={cn(
              "size-3 rounded-full",
              i < done ? "bg-brass" : "border border-surface-divider"
            )}
          />
        ))}
      </View>
      <Text variant="caption" className="text-text-muted">
        {complete ? "done" : "tap to count"}
      </Text>
    </Pressable>
  );
}
