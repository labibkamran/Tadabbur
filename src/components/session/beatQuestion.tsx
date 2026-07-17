/**
 * Beat 4 — a question to carry, and the two exits that hand you forward: into Ask
 * (seeded with the verse) or into the reader at that verse.
 */

import { Chip } from "@/components/chip";
import { FadeInView } from "@/components/fadeInView";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

type BeatQuestionProps = {
  question: string;
  onAsk: () => void;
  onRead: () => void;
};

export function BeatQuestion({ question, onAsk, onRead }: BeatQuestionProps) {
  return (
    <View className="flex-1 items-center justify-center gap-8 px-10">
      <FadeInView delay={0}>
        <View className="items-center gap-3">
          <Text variant="caption" className="text-text-muted">
            A question to carry
          </Text>
          <Text variant="translation" className="text-center" style={{ fontSize: 21 }}>
            {question}
          </Text>
        </View>
      </FadeInView>
      <FadeInView delay={300}>
        <View className="flex-row gap-3">
          <Chip label="Ask about this" onPress={onAsk} />
          <Chip label="Read in context" onPress={onRead} />
        </View>
      </FadeInView>
    </View>
  );
}
