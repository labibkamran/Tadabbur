/**
 * AssistantMessage — the generated turn. A short "thinking" pause, then the reflection
 * types in word by word, then the verses reveal one at a time and the disclosure last.
 * If the (mocked) call can't reach the network it shows a quiet error with retry. Prose
 * is Inter (machine voice); the verses are the Qur'an. Never mixed in one block.
 */

import { Disclosure } from "@/components/ask/disclosure";
import { StreamingDots } from "@/components/ask/streamingDots";
import { FadeInView } from "@/components/fadeInView";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VerseCard } from "@/components/verseCard";
import { useOnline } from "@/lib/useOnline";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Answer } from "@/types/thread";
import { IconRefresh } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";

const THINK_MS = 2400;
const WORD_MS = 45;
const REVEAL_MS = 550;

type Phase = "thinking" | "streaming" | "revealing" | "error";

export function AssistantMessage({ answer, stream = true }: { answer: Answer; stream?: boolean }) {
  const reduced = useReducedMotion();
  const online = useOnline();
  const onlineRef = useRef(online);
  onlineRef.current = online;

  const words = useMemo(() => answer.prose.split(" "), [answer.prose]);
  const [phase, setPhase] = useState<Phase>(stream ? "thinking" : "revealing");
  const [shown, setShown] = useState(stream ? 0 : words.length);
  const [revealed, setRevealed] = useState(stream ? 0 : answer.verses.length + 1);
  const [attempt, setAttempt] = useState(0);

  // think, then either stream the answer or fail if there's no connection. Skipped for a
  // replayed history thread, which is already complete. Re-runs on retry.
  useEffect(() => {
    if (!stream) return;
    setPhase("thinking");
    setShown(0);
    setRevealed(0);
    const t = setTimeout(() => {
      if (!onlineRef.current) {
        setPhase("error");
      } else if (reduced) {
        setShown(words.length);
        setRevealed(answer.verses.length + 1);
        setPhase("revealing");
      } else {
        setPhase("streaming");
      }
    }, THINK_MS);
    return () => clearTimeout(t);
  }, [stream, reduced, attempt, words.length, answer.verses.length]);

  // reveal the prose one word at a time, then move on to the verses
  useEffect(() => {
    if (phase !== "streaming") return;
    if (shown >= words.length) {
      setPhase("revealing");
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), WORD_MS);
    return () => clearTimeout(t);
  }, [phase, shown, words.length]);

  // then reveal each verse card, and the disclosure last, one after another
  useEffect(() => {
    if (phase !== "revealing" || revealed > answer.verses.length) return;
    const t = setTimeout(() => setRevealed((n) => n + 1), REVEAL_MS);
    return () => clearTimeout(t);
  }, [phase, revealed, answer.verses.length]);

  return (
    <View className="max-w-[92%] gap-3.5 self-start rounded-bubble rounded-bl-sm border border-surface-divider bg-surface-raised p-4">
      {phase === "error" ? (
        <View className="gap-3">
          <Text variant="body" className="text-text-secondary">
            Couldn't reach the reflection. Check your connection and try again.
          </Text>
          <Pressable
            onPress={() => setAttempt((a) => a + 1)}
            accessibilityRole="button"
            accessibilityLabel="Try again"
            className="min-h-11 flex-row items-center gap-2 self-start active:opacity-60"
          >
            <Icon as={IconRefresh} size={17} className="text-brass-strong" />
            <Text variant="label" className="text-brass-strong">
              Try again
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          {phase === "thinking" ? (
            <StreamingDots />
          ) : (
            <Text variant="body">{words.slice(0, shown).join(" ")}</Text>
          )}

          {answer.verses.slice(0, Math.min(revealed, answer.verses.length)).map((v) => (
            <FadeInView key={`${v.chapter}:${v.verse}`} rise={8}>
              <VerseCard
                verse={v}
                onReadInContext={() =>
                  router.push({
                    pathname: "/surah/[number]",
                    params: { number: String(v.chapter), ayah: String(v.verse) },
                  })
                }
              />
            </FadeInView>
          ))}

          {revealed > answer.verses.length ? (
            <FadeInView rise={8}>
              <Disclosure />
            </FadeInView>
          ) : null}
        </>
      )}
    </View>
  );
}
