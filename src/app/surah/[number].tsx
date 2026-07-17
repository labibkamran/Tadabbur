/**
 * AyahReader — one surah, ayah by ayah. Arabic (the Qur'an) first, translation beneath,
 * the ۝ mark carrying each ayah number. Opens to a cited ayah when linked with ?ayah.
 * The Bismillah shows as a header, except Al-Fatihah (its ayah 1) and At-Tawbah (none).
 */

import { Screen } from "@/components/screen";
import { ArabicText } from "@/components/ui/arabicText";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { loadSurah } from "@/data/curated/quran";
import { SURAHS } from "@/data/curated/quran/surahs";
import { goBack } from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { AyahText } from "@/types/surah";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toArabicDigits = (n: number) => String(n).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);

export default function AyahReader() {
  const { number, ayah } = useLocalSearchParams<{ number: string; ayah?: string }>();
  const n = Number(number);
  const meta = SURAHS[n - 1];
  const verses = useMemo(() => loadSurah(n), [n]);
  // Bismillah taken from Al-Fatihah's ayah 1 so its glyphs match the bundled mushaf.
  const bismillah = useMemo(() => loadSurah(1)[0]?.arabic ?? "", []);
  const target = ayah ? Number(ayah) : undefined;
  const listRef = useRef<FlatList<AyahText>>(null);
  const [highlight, setHighlight] = useState(target);

  // land on the cited ayah, then let the highlight fade off after a beat
  useEffect(() => {
    if (!target) return;
    const idx = verses.findIndex((v) => v.verse === target);
    if (idx < 0) return;
    const scrollT = setTimeout(
      () => listRef.current?.scrollToIndex({ index: idx, animated: true, viewPosition: 0.15 }),
      300
    );
    const clearT = setTimeout(() => setHighlight(undefined), 2600);
    return () => {
      clearTimeout(scrollT);
      clearTimeout(clearT);
    };
  }, [target, verses]);

  if (!meta) return <Screen />;

  const showBismillah = n !== 1 && n !== 9;

  return (
    <Screen bottom={false}>
      <View className="flex-row items-center border-b border-surface-divider px-2 py-2">
        <Pressable
          onPress={() => goBack("/read")}
          accessibilityRole="button"
          accessibilityLabel="Back"
          className="size-11 items-center justify-center active:opacity-60"
        >
          <Icon as={IconArrowLeft} size={22} className="text-text-secondary" />
        </Pressable>
        <View className="flex-1">
          <Text variant="body" className="font-sans-medium">
            {meta.englishName}
          </Text>
          <Text variant="caption" className="text-text-muted">
            {meta.meaning} · {meta.ayahs} ayahs · {meta.revelation}
          </Text>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={verses}
        keyExtractor={(v) => String(v.verse)}
        renderItem={({ item }) => (
          <View className={cn("gap-2.5 px-4 py-4", item.verse === highlight && "bg-brand-tint")}>
            <ArabicText variant="verse">
              {item.arabic} ۝{toArabicDigits(item.verse)}
            </ArabicText>
            <Text variant="translation" className="text-text-secondary">
              {item.translation}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-px bg-surface-divider" />}
        ListHeaderComponent={
          showBismillah ? (
            <View className="items-center px-4 pb-2 pt-5">
              <ArabicText variant="verse">{bismillah}</ArabicText>
            </View>
          ) : null
        }
        onScrollToIndexFailed={(info) =>
          listRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          })
        }
        contentContainerClassName="pb-10"
      />
    </Screen>
  );
}
