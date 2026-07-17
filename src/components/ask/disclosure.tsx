/**
 * Disclosure — the mandatory note under every generated answer: this is a reflection,
 * not tafsir, and the verses are the real source. Always shown, never hidden or folded.
 */

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { IconSparkles } from "@tabler/icons-react-native";
import { View } from "react-native";

export function Disclosure() {
  return (
    <View className="flex-row gap-2.5 border-t border-surface-divider pt-3">
      <Icon as={IconSparkles} size={15} className="mt-0.5 text-brass" />
      <Text variant="caption" className="flex-1 text-text-secondary">
        An AI reflection, not tafsir. Read the verses in full. They are the source. For
        anything you would act on, ask someone qualified.
      </Text>
    </View>
  );
}
