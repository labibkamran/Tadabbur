/**
 * VerseCard — one verse: Arabic, translation, citation. The reusable card behind
 * Today, Thread, AyahReader, and SavedVerses. Arabic is the Qur'an (top, primary);
 * the translation sits one step below; the citation always names the translator.
 */

import { ArabicText } from "@/components/ui/arabicText";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import type { Verse } from "@/types/verse";
import { IconBook, IconBookmark, IconBookmarkFilled } from "@tabler/icons-react-native";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Pressable, View } from "react-native";

type VerseCardProps = {
  verse: Verse;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
  onReadInContext?: () => void;
};

export function VerseCard({
  verse,
  bookmarked = false,
  onToggleBookmark,
  onReadInContext,
}: VerseCardProps) {
  const bloom = useRef(new Animated.Value(bookmarked ? 1 : 0)).current;
  const reduced = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((r) => (reduced.current = r));
  }, []);

  useEffect(() => {
    if (reduced.current) {
      bloom.setValue(bookmarked ? 1 : 0);
      return;
    }
    Animated.spring(bloom, {
      toValue: bookmarked ? 1 : 0,
      useNativeDriver: true,
      speed: 18,
      bounciness: 10,
    }).start();
  }, [bookmarked, bloom]);

  const handleBookmark = () => {
    Haptics.selectionAsync();
    onToggleBookmark?.();
  };

  return (
    <View className="gap-2.5 rounded-md border-l-2 border-l-brass bg-surface-sunken p-4">
      <ArabicText variant="verse">{verse.arabic}</ArabicText>

      <Text variant="translation" className="text-text-secondary">
        {verse.translation}
      </Text>

      <View className="flex-row items-center gap-3.5">
        <Text variant="label" className="flex-1 text-brass-strong">
          {verse.surah} {verse.chapter}:{verse.verse} · {verse.translator}
        </Text>

        {onReadInContext ? (
          <Pressable
            onPress={onReadInContext}
            accessibilityRole="button"
            accessibilityLabel="Read in context"
            className="min-h-11 justify-center active:opacity-60"
          >
            <Icon as={IconBook} size={19} className="text-text-secondary" />
          </Pressable>
        ) : null}

        {onToggleBookmark ? (
          <Pressable
            onPress={handleBookmark}
            accessibilityRole="button"
            accessibilityState={{ selected: bookmarked }}
            accessibilityLabel={bookmarked ? "Remove bookmark" : "Bookmark"}
            className="min-h-11 justify-center active:opacity-60"
          >
            <View>
              <Icon as={IconBookmark} size={19} className="text-text-secondary" />
              <Animated.View
                style={{ position: "absolute", transform: [{ scale: bloom }] }}
              >
                <Icon as={IconBookmarkFilled} size={19} className="text-brass" />
              </Animated.View>
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
