/**
 * Chip — a suggestion pill. Transparent, divider border, never brand-filled.
 * Reused by Today, AskHome, and Session.
 */

import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";

export function Chip({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      className="rounded-pill border border-surface-divider px-3.5 py-2.5 active:opacity-60"
    >
      <Text variant="label" className="text-text-secondary">
        {label}
      </Text>
    </Pressable>
  );
}
