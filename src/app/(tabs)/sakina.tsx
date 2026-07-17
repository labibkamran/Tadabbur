/**
 * FeelingPicker — the Sakina doorway. Pick a feeling, go straight into a session.
 * Words only, in soft cards two per row, each with a gentle line of recognition.
 */

import { FadeInView } from "@/components/fadeInView";
import { FeelingCard } from "@/components/sakina/feelingCard";
import { Screen } from "@/components/screen";
import { Text } from "@/components/ui/text";
import { FEELINGS } from "@/data/curated/sakina";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

const ROWS = Array.from({ length: Math.ceil(FEELINGS.length / 2) }, (_, i) =>
  FEELINGS.slice(i * 2, i * 2 + 2)
);

export default function Sakina() {
  return (
    <Screen bottom={false}>
      <View className="px-4 pt-6">
        <FadeInView delay={0}>
          <View className="px-2">
            <Text variant="title">How are you feeling?</Text>
            <Text variant="body" className="pt-1.5 text-text-secondary">
              There's a word for it, or there isn't. Start anywhere.
            </Text>
          </View>
        </FadeInView>
      </View>

      <FadeInView delay={160} flex>
        <ScrollView
          contentContainerClassName="gap-3 px-4 pb-6 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {ROWS.map((row, i) => (
            <View key={i} className="flex-row gap-3" style={{ minHeight: 140 }}>
              {row.map((feeling) => (
                <FeelingCard
                  key={feeling.key}
                  label={feeling.key}
                  line={feeling.line}
                  onPress={() =>
                    router.push({ pathname: "/session", params: { emotion: feeling.key } })
                  }
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </FadeInView>
    </Screen>
  );
}
