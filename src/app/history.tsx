/**
 * HistorySheet — past questions, newest first. A modal list; tapping one reopens that
 * thread. Dummy data for now, so it stands until threads are actually persisted.
 */

import { Screen } from "@/components/screen";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ASK_HISTORY } from "@/data/ask";
import { goBack } from "@/lib/nav";
import { IconX } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

export default function History() {
  const open = (question: string) => {
    router.push({ pathname: "/thread", params: { q: question, history: "1" } });
  };

  return (
    <Screen>
      <View className="flex-row items-center border-b border-surface-divider px-4 py-3">
        <Text variant="title" className="flex-1">
          History
        </Text>
        <Pressable
          onPress={() => goBack("/ask")}
          accessibilityRole="button"
          accessibilityLabel="Close"
          className="-mr-2.5 size-11 items-center justify-center active:opacity-60"
        >
          <Icon as={IconX} size={22} className="text-text-secondary" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="py-1">
        {ASK_HISTORY.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => open(item.question)}
            accessibilityRole="button"
            accessibilityLabel={item.question}
            className="gap-1 border-b border-surface-divider px-4 py-3.5 active:bg-surface-sunken"
          >
            <Text variant="body" numberOfLines={2}>
              {item.question}
            </Text>
            <Text variant="caption" className="text-text-muted">
              {item.when}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
