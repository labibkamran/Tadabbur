/**
 * SurahIndex — the 114 surahs, searchable. The way into reading; tapping a surah opens
 * the reader. Curated, bundled, offline, so it never waits on a network.
 */

import { Screen } from "@/components/screen";
import { StateView } from "@/components/stateView";
import { ArabicText } from "@/components/ui/arabicText";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { SURAHS } from "@/data/curated/quran/surahs";
import type { SurahMeta } from "@/types/surah";
import { IconSearchOff } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Read() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SURAHS;
    return SURAHS.filter(
      (s) =>
        s.englishName.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        String(s.number) === q
    );
  }, [query]);

  return (
    <Screen bottom={false}>
      <View className="gap-3 px-4 pb-2 pt-3.5">
        <Text variant="title">Read</Text>
        <Input placeholder="Search surah" value={query} onChangeText={setQuery} />
      </View>
      {filtered.length === 0 ? (
        <StateView
          icon={IconSearchOff}
          title="No surah found"
          message="Try a different name or number."
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(s) => String(s.number)}
          renderItem={({ item }) => <SurahRow surah={item} />}
          ItemSeparatorComponent={() => <View className="ml-14 h-px bg-surface-divider" />}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="pb-6"
        />
      )}
    </Screen>
  );
}

function SurahRow({ surah }: { surah: SurahMeta }) {
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/surah/[number]", params: { number: String(surah.number) } })
      }
      accessibilityRole="button"
      accessibilityLabel={`${surah.englishName}, ${surah.ayahs} ayahs`}
      className="flex-row items-center gap-3.5 px-4 py-3 active:bg-surface-sunken"
    >
      <Text variant="label" className="w-7 text-center text-brass-strong">
        {surah.number}
      </Text>
      <View className="flex-1">
        <Text variant="body">{surah.englishName}</Text>
        <Text variant="caption" className="text-text-muted">
          {surah.meaning} · {surah.ayahs} ayahs · {surah.revelation}
        </Text>
      </View>
      <ArabicText variant="name">{surah.name}</ArabicText>
    </Pressable>
  );
}
