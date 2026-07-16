/**
 * AsmaCard — one of the names of Allah. Arabic on the right, transliteration and
 * meaning on the left. No brass rule, so it doesn't read as the verse card.
 */

import { ArabicText } from "@/components/ui/arabicText";
import { Text } from "@/components/ui/text";
import type { AsmaName } from "@/types/asma";
import { View } from "react-native";

export function AsmaCard({ name }: { name: AsmaName }) {
  return (
    <View className="flex-row items-center gap-4 rounded-md border border-surface-divider p-4">
      <View className="flex-1 gap-0.5">
        <Text variant="label" className="text-brass-strong">
          {name.transliteration}
        </Text>
        <Text variant="translation" className="text-text-secondary">
          {name.meaning}
        </Text>
      </View>
      <ArabicText variant="verse">{name.arabic}</ArabicText>
    </View>
  );
}
