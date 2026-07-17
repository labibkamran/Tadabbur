/**
 * Beat 1 — "Sit for a moment." The breathing arch and one line. No skip.
 */

import { BreathingArch } from "@/components/session/breathingArch";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function BeatBreath() {
  return (
    <View className="flex-1 items-center justify-center gap-10 px-8">
      <BreathingArch />
      <Text variant="body" className="text-text-secondary">
        Sit for a moment.
      </Text>
    </View>
  );
}
