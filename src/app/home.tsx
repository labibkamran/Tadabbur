/**
 * Home — placeholder landing after onboarding. Replaced by the tab navigator later.
 */

import { Screen } from "@/components/screen";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function Home() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text
          className="font-serif text-text-primary"
          style={{ fontSize: 34, letterSpacing: 1.5 }}
          maxFontSizeMultiplier={1.35}
        >
          Tadabbur
        </Text>
      </View>
    </Screen>
  );
}
