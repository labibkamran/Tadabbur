/**
 * Beat 3 — repeat the verse. The ayah stays in view while you recite it slowly,
 * counting each time, until it settles. Continue appears once the count is complete.
 */

import { Chip } from "@/components/chip";
import { RepeatCounter } from "@/components/session/repeatCounter";
import { ArabicText } from "@/components/ui/arabicText";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { View } from "react-native";

type BeatRepeatProps = {
  phrase: string;
  count: number;
  onContinue: () => void;
};

export function BeatRepeat({ phrase, count, onContinue }: BeatRepeatProps) {
  const [done, setDone] = useState(0);
  const complete = done >= count;

  return (
    <View className="flex-1 items-center justify-center gap-8 px-6">
      <ArabicText variant="verseLarge" style={{ textAlign: "center" }}>
        {phrase}
      </ArabicText>
      <Text variant="body" className="text-text-secondary">
        Repeat it slowly
      </Text>
      <RepeatCounter count={count} done={done} onTap={() => setDone((d) => Math.min(d + 1, count))} />
      {complete ? <Chip label="Continue" onPress={onContinue} /> : null}
    </View>
  );
}
