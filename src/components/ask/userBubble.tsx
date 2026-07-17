/**
 * UserBubble — the person's turn: brand fill, right-aligned, a small tail toward the
 * sender. The one place brand is a large fill, on purpose, to mark "you said this".
 */

import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function UserBubble({ text }: { text: string }) {
  return (
    <View className="max-w-[85%] self-end rounded-bubble rounded-br-sm bg-brand px-4 py-2.5">
      <Text variant="bubble" className="text-text-onBrand">
        {text}
      </Text>
    </View>
  );
}
