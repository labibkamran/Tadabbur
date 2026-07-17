/**
 * StateView — a centered empty or error state: a quiet glyph, a line, a message, and an
 * optional action. Failures carry no religious language; a timeout is not a spiritual event.
 */

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import type { Icon as TablerIcon } from "@tabler/icons-react-native";
import { Pressable, View } from "react-native";

type StateViewProps = {
  icon: TablerIcon;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function StateView({ icon, title, message, actionLabel, onAction }: StateViewProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 px-10 py-16">
      <Icon as={icon} size={28} className="text-text-muted" />
      <Text variant="body" className="text-center font-sans-medium">
        {title}
      </Text>
      {message ? (
        <Text variant="body" className="text-center text-text-secondary">
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          className="mt-1 min-h-11 justify-center rounded-pill border border-surface-divider px-5 active:opacity-60"
        >
          <Text variant="label" className="text-brass-strong">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
