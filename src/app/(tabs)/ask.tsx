/**
 * Ask — placeholder. The chat home and thread land here next.
 */

import { Screen } from "@/components/screen";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function Ask() {
  return (
    <Screen bottom={false}>
      <View className="flex-1 items-center justify-center">
        <Text variant="title">Ask</Text>
      </View>
    </Screen>
  );
}
