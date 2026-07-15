/**
 * Placeholder screen — the wordmark. Replaced once the tab navigator lands.
 */

import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-surface-canvas">
      <Text
        className="font-serif text-text-primary"
        style={{ fontSize: 34, letterSpacing: 1.5 }}
        maxFontSizeMultiplier={1.35}
      >
        tadabbur
      </Text>
    </View>
  );
}
