/**
 * FeelingCard — a soft card holding one feeling and a gentle line of recognition.
 * The word is warm serif; the line helps a person see themselves in it.
 */

import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";

type FeelingCardProps = {
  label: string;
  line: string;
  onPress: () => void;
};

export function FeelingCard({ label, line, onPress }: FeelingCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${line}`}
      className="flex-1 items-center justify-center gap-1.5 rounded-lg bg-surface-sunken px-2 active:bg-surface-divider"
    >
      <Text variant="translation" className="text-text-primary" style={{ fontSize: 19 }}>
        {label}
      </Text>
      <Text variant="caption" className="text-center text-text-muted">
        {line}
      </Text>
    </Pressable>
  );
}
