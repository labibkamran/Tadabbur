/**
 * Today — the default tab. Greeting, week strip, verse of the day, a curated
 * reflection, and two chips. No disclosure: this surface never calls the model.
 */

import { Chip } from "@/components/chip";
import { FadeInView } from "@/components/fadeInView";
import { Screen } from "@/components/screen";
import { AsmaCard } from "@/components/today/asmaCard";
import { GreetingHeader } from "@/components/today/greetingHeader";
import { SakinaInvite } from "@/components/today/sakinaInvite";
import { WeekStrip } from "@/components/today/weekStrip";
import { Text } from "@/components/ui/text";
import { VerseCard } from "@/components/verseCard";
import { ASMA_UL_HUSNA } from "@/data/curated/asmaulhusna";
import { GREETING, REFLECTION } from "@/data/curated/today";
import { VERSE_OF_THE_DAY } from "@/data/curated/verses";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function Today() {
  const [bookmarked, setBookmarked] = useState(false);

  const now = new Date();
  const date = now.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const todayIndex = (now.getDay() + 6) % 7;
  const opened = Array.from({ length: 7 }, (_, i) => i < todayIndex && i >= todayIndex - 2);

  const dayNumber = Math.floor(now.getTime() / 86400000);
  const name = ASMA_UL_HUSNA[dayNumber % ASMA_UL_HUSNA.length];

  return (
    <Screen bottom={false}>
      <ScrollView contentContainerClassName="gap-7 p-4" showsVerticalScrollIndicator={false}>
        <FadeInView delay={0}>
          <GreetingHeader date={date} greeting={GREETING} initials="YA" />
        </FadeInView>

        <FadeInView delay={100}>
          <WeekStrip opened={opened} todayIndex={todayIndex} />
        </FadeInView>

        <FadeInView delay={200}>
          <View className="gap-2.5">
            <Text variant="caption" className="text-text-muted">
              Verse of the day
            </Text>
            <VerseCard
              verse={VERSE_OF_THE_DAY}
              bookmarked={bookmarked}
              onToggleBookmark={() => setBookmarked((b) => !b)}
            />
            <Text variant="translation" className="px-1 text-text-secondary">
              {REFLECTION}
            </Text>
          </View>
        </FadeInView>

        <FadeInView delay={320}>
          <View className="flex-row flex-wrap gap-2">
            <Chip label="Ask about this verse" onPress={() => router.push("/ask")} />
            <Chip label="Read in context" onPress={() => router.push("/read")} />
          </View>
        </FadeInView>

        <FadeInView delay={420}>
          <View className="gap-2.5">
            <Text variant="caption" className="text-text-muted">
              Today's name of Allah
            </Text>
            <AsmaCard name={name} />
          </View>
        </FadeInView>

        <FadeInView delay={520}>
          <SakinaInvite />
        </FadeInView>
      </ScrollView>
    </Screen>
  );
}
