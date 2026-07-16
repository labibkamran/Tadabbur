/**
 * Today — placeholder. Verse of the day, week strip, and reflection land here next.
 */

import { Screen } from "@/components/screen";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function Today() {
  return (
    <Screen bottom={false}>
      <View className="flex-1 items-center justify-center">
        <Text variant="title">Today</Text>
      </View>
    </Screen>
  );
}
