/**
 * Beat 2 — the verse. Arabic fades in, the translation follows, then the citation.
 * Centered and spacious; this is the emotional peak of the session.
 */

import { FadeInView } from "@/components/fadeInView";
import { ArabicText } from "@/components/ui/arabicText";
import { Text } from "@/components/ui/text";
import type { Verse } from "@/types/verse";
import { View } from "react-native";

export function BeatVerse({ verse }: { verse: Verse }) {
  return (
    <View className="flex-1 items-center justify-center gap-5 px-6">
      <FadeInView delay={0}>
        <ArabicText variant="verseLarge" style={{ textAlign: "center" }}>
          {verse.arabic}
        </ArabicText>
      </FadeInView>
      <FadeInView delay={400}>
        <Text variant="translation" className="text-center text-text-secondary">
          {verse.translation}
        </Text>
      </FadeInView>
      <FadeInView delay={700}>
        <Text variant="label" className="text-brass-strong">
          {verse.surah} {verse.chapter}:{verse.verse} · {verse.translator}
        </Text>
      </FadeInView>
    </View>
  );
}
