/**
 * Thread — the full-screen conversation. The question, a short pause, then the reflection
 * types in with the verses it points to. Follow-ups append below. No tab bar. The model
 * is mocked at one seam: every question returns the same answer until a backend exists.
 */

import { AssistantMessage } from "@/components/ask/assistantMessage";
import { UserBubble } from "@/components/ask/userBubble";
import { OfflineBanner } from "@/components/offlineBanner";
import { Screen } from "@/components/screen";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { ASK_MOCK_ANSWER } from "@/data/ask";
import { goBack } from "@/lib/nav";
import { useKeyboardHeight } from "@/lib/useKeyboardHeight";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/thread";
import { IconArrowLeft, IconArrowUp } from "@tabler/icons-react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

let seq = 0;
const nextId = () => `m${++seq}`;

function turnsFor(question: string, stream: boolean): Message[] {
  return [
    { id: nextId(), role: "user", text: question },
    { id: nextId(), role: "assistant", answer: ASK_MOCK_ANSWER, stream },
  ];
}

export default function Thread() {
  const { q, history } = useLocalSearchParams<{ q: string; history?: string }>();
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardHeight();
  const [messages, setMessages] = useState<Message[]>(() =>
    q ? turnsFor(q, history !== "1") : []
  );
  const [text, setText] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const canSend = text.trim().length > 0;

  // keep the newest turn visible as the keyboard pushes the composer up
  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    return () => clearTimeout(t);
  }, [keyboard]);

  const send = () => {
    const value = text.trim();
    if (!value) return;
    setText("");
    setMessages((prev) => [...prev, ...turnsFor(value, true)]);
  };

  return (
    <Screen bottom={false}>
      <View className="flex-1" style={{ paddingBottom: keyboard > 0 ? keyboard : insets.bottom }}>
        <View className="flex-row items-center border-b border-surface-divider px-2 py-2">
          <Pressable
            onPress={() => goBack("/ask")}
            accessibilityRole="button"
            accessibilityLabel="Back"
            className="size-11 items-center justify-center active:opacity-60"
          >
            <Icon as={IconArrowLeft} size={22} className="text-text-secondary" />
          </Pressable>
        </View>

        <OfflineBanner />

        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerClassName="gap-4 px-4 py-4"
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((m) =>
            m.role === "user" ? (
              <UserBubble key={m.id} text={m.text} />
            ) : (
              <AssistantMessage key={m.id} answer={m.answer} stream={m.stream} />
            )
          )}
        </ScrollView>

        <View className="flex-row items-end gap-2.5 border-t border-surface-divider px-4 pb-2 pt-2.5">
          <Input
            className="flex-1"
            placeholder="Ask a follow-up"
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable
            onPress={send}
            disabled={!canSend}
            accessibilityRole="button"
            accessibilityLabel="Send"
            className={cn(
              "size-10 items-center justify-center rounded-full",
              canSend ? "bg-brass active:bg-brass-strong" : "bg-surface-divider"
            )}
          >
            <Icon
              as={IconArrowUp}
              size={20}
              className={canSend ? "text-text-onBrand" : "text-text-muted"}
            />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
