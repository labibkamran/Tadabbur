/**
 * OnboardingQuestion — the shared screen for Age, Journey, Intent, Translation.
 * Presentational: the questions route owns answers and selection. Options stagger in;
 * the title fades in on each question. Continue hides when the question auto-advances.
 */

import { OptionCard } from "@/components/onboarding/optionCard";
import { ProgressDots } from "@/components/onboarding/progressDots";
import { Screen } from "@/components/screen";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import type { OnboardingQuestionConfig } from "@/types/onboarding";
import { IconChevronLeft } from "@tabler/icons-react-native";
import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Pressable, ScrollView, View } from "react-native";

type OnboardingQuestionProps = {
  config: OnboardingQuestionConfig;
  index: number;
  total: number;
  selected: string[];
  canContinue: boolean;
  showContinue: boolean;
  onToggle: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function OnboardingQuestion({
  config,
  index,
  total,
  selected,
  canContinue,
  showContinue,
  onToggle,
  onBack,
  onContinue,
}: OnboardingQuestionProps) {
  const titleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (reduced) {
        titleAnim.setValue(1);
        return;
      }
      titleAnim.setValue(0);
      Animated.timing(titleAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  }, [config.key, titleAnim]);

  return (
    <Screen>
      <View className="flex-row items-center px-4 pb-1 pt-3.5">
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          className="-ml-2.5 size-11 items-center justify-center active:opacity-60"
        >
          <Icon as={IconChevronLeft} size={22} className="text-text-secondary" />
        </Pressable>
        <View className="flex-1">
          <ProgressDots total={total} index={index} />
        </View>
        <View className="size-11" />
      </View>

      <Animated.View
        style={{
          opacity: titleAnim,
          transform: [
            { translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
          ],
        }}
      >
        <View className="px-5 pb-1 pt-4">
          <Text variant="title">{config.title}</Text>
          {config.helper ? (
            <Text variant="label" className="pt-1 text-text-secondary">
              {config.helper}
            </Text>
          ) : null}
        </View>
      </Animated.View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-2.5 px-5 py-4"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {config.options.map((option, i) => (
          <OptionCard
            key={`${config.key}-${option.value}`}
            label={option.label}
            badge={option.badge}
            multi={config.select === "multi"}
            selected={selected.includes(option.value)}
            entryDelay={i * 45}
            onPress={() => onToggle(option.value)}
          />
        ))}
      </ScrollView>

      {showContinue ? (
        <View className="px-5 pb-5 pt-3">
          <Button className="w-full" disabled={!canContinue} onPress={onContinue}>
            <Text>Continue</Text>
          </Button>
        </View>
      ) : (
        <View className="pb-5" />
      )}
    </Screen>
  );
}
