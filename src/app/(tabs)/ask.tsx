/**
 * AskHome — the chat surface, empty state. Greeting, a few suggestion chips, and an
 * input pinned to the bottom. One input, a few offers, nothing else. The space is
 * intentional. Submitting opens a thread.
 */

import { Chip } from "@/components/chip";
import { OfflineBanner } from "@/components/offlineBanner";
import { Screen } from "@/components/screen";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ASK_SUGGESTIONS } from "@/data/ask";
import { GREETING } from "@/data/curated/today";
import { useAuth } from "@/lib/useAuth";
import { useKeyboardHeight } from "@/lib/useKeyboardHeight";
import { cn } from "@/lib/utils";
import { IconArrowUp, IconHistory } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

export default function Ask() {
  const { initials } = useAuth();
  const [text, setText] = useState("");
  const keyboard = useKeyboardHeight();
  const canSend = text.trim().length > 0;

  const submit = (question: string) => {
    const q = question.trim();
    if (!q) return;
    setText("");
    router.push({ pathname: "/thread", params: { q } });
  };

  return (
    <Screen bottom={false}>
      <View className="flex-1" style={{ paddingBottom: keyboard }}>
        <View className="flex-row items-center gap-1 px-4 pb-2 pt-3.5">
          <Text variant="title" className="flex-1">
            {GREETING}
          </Text>
          <Pressable
            onPress={() => router.push("/history")}
            accessibilityRole="button"
            accessibilityLabel="History"
            className="size-11 items-center justify-center active:opacity-60"
          >
            <Icon as={IconHistory} size={22} className="text-text-secondary" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/profile")}
            accessibilityRole="button"
            accessibilityLabel="Profile"
            className="active:opacity-60"
          >
            <Avatar alt="Profile">
              <AvatarFallback>
                <Text variant="label" className="text-brand">
                  {initials}
                </Text>
              </AvatarFallback>
            </Avatar>
          </Pressable>
        </View>

        <OfflineBanner />

        <View className="flex-1" />

        <View className="flex-row flex-wrap gap-2 px-4 pb-3">
          {ASK_SUGGESTIONS.map((s) => (
            <Chip key={s} label={s} onPress={() => submit(s)} />
          ))}
        </View>

        <View className="flex-row items-end gap-2.5 border-t border-surface-divider px-4 py-2.5">
          <Input
            className="flex-1"
            placeholder="Ask about anything"
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable
            onPress={() => submit(text)}
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
