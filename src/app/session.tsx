/**
 * Session — the four-beat calming flow for a feeling. Full screen, no tab bar.
 * Breath (auto) → verse → repeat (counted) → question. A close is on every beat.
 * Reduce-motion turns the timers into taps.
 */

import { BeatBreath } from "@/components/session/beatBreath";
import { BeatQuestion } from "@/components/session/beatQuestion";
import { BeatRepeat } from "@/components/session/beatRepeat";
import { BeatVerse } from "@/components/session/beatVerse";
import { SessionProgress } from "@/components/session/sessionProgress";
import { TapHint } from "@/components/session/tapHint";
import { Screen } from "@/components/screen";
import { Icon } from "@/components/ui/icon";
import { getSessionEntry } from "@/data/curated/sakina";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { IconX } from "@tabler/icons-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";

const TOTAL = 4;

export default function Session() {
  const { emotion } = useLocalSearchParams<{ emotion: string }>();
  const entry = useMemo(() => getSessionEntry(emotion), [emotion]);
  const reduced = useReducedMotion();

  const [beat, setBeat] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    setReady(false);
    if (beat === 0) {
      const t = setTimeout(() => setBeat(1), 8000);
      return () => clearTimeout(t);
    }
    if (beat === 1) {
      const t = setTimeout(() => setReady(true), 6000);
      return () => clearTimeout(t);
    }
    setReady(true);
  }, [beat, reduced]);

  const advance = () => {
    if (beat >= 2) return;
    if (beat === 0 && !reduced) return;
    if (ready) setBeat((b) => b + 1);
  };

  return (
    <Screen>
      <View className="flex-row items-center gap-2 px-5 pt-3">
        <View className="flex-1">
          <SessionProgress beat={beat} total={TOTAL} />
        </View>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Close"
          className="-mr-2.5 size-11 items-center justify-center active:opacity-60"
        >
          <Icon as={IconX} size={22} className="text-text-secondary" />
        </Pressable>
      </View>

      <Pressable className="flex-1" onPress={advance} accessibilityRole="none">
        <View className="flex-1">
          {beat === 0 ? <BeatBreath /> : null}
          {beat === 1 ? <BeatVerse verse={entry.verse} /> : null}
          {beat === 2 ? (
            <BeatRepeat phrase={entry.repeat} count={entry.count} onContinue={() => setBeat(3)} />
          ) : null}
          {beat === 3 ? (
            <BeatQuestion
              question={entry.question}
              onAsk={() => router.replace("/ask")}
              onRead={() => router.replace("/read")}
            />
          ) : null}
        </View>
        <View className="h-12 items-center justify-center">
          {ready && beat === 1 ? <TapHint /> : null}
        </View>
      </Pressable>
    </Screen>
  );
}
