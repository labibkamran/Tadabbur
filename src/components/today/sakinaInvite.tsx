/**
 * SakinaInvite — a gentle doorway from Today into the Sakina calming session.
 * An invitation, not another thing to read, so the verse stays the content hero.
 */

import { ArchIcon } from "@/components/archIcon";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useVarColor } from "@/lib/useVarColor";
import { IconChevronRight } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export function SakinaInvite() {
  const brand = useVarColor("--brand-default", "#14493C");

  return (
    <Pressable
      onPress={() => router.push("/sakina")}
      accessibilityRole="button"
      accessibilityLabel="Take a moment. How are you feeling?"
      className="min-h-11 flex-row items-center gap-3.5 rounded-md border border-surface-divider bg-surface-raised p-4 active:bg-surface-sunken"
    >
      <ArchIcon size={24} color={brand} />
      <View className="flex-1">
        <Text variant="caption" className="text-text-muted">
          Take a moment
        </Text>
        <Text variant="body">How are you feeling?</Text>
      </View>
      <Icon as={IconChevronRight} size={18} className="text-text-muted" />
    </Pressable>
  );
}
