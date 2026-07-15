/**
 * OptionCard — one selectable answer. Staggers in on mount, scales on press,
 * and blooms its check on select. Multi questions show the check circle.
 */

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react-native";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Pressable, View } from "react-native";

type OptionCardProps = {
  label: string;
  badge?: string;
  selected: boolean;
  multi: boolean;
  entryDelay?: number;
  onPress: () => void;
};

export function OptionCard({
  label,
  badge,
  selected,
  multi,
  entryDelay = 0,
  onPress,
}: OptionCardProps) {
  const entry = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(1)).current;
  const check = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (reduced) {
        entry.setValue(1);
        return;
      }
      Animated.timing(entry, {
        toValue: 1,
        duration: 260,
        delay: entryDelay,
        useNativeDriver: true,
      }).start();
    });
  }, [entry, entryDelay]);

  useEffect(() => {
    Animated.spring(check, {
      toValue: selected ? 1 : 0,
      useNativeDriver: true,
      speed: 18,
      bounciness: 8,
    }).start();
  }, [selected, check]);

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress();
  };

  return (
    <Animated.View
      style={{
        opacity: entry,
        transform: [
          { translateY: entry.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) },
          { scale: press },
        ],
      }}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={() =>
          Animated.spring(press, { toValue: 0.98, useNativeDriver: true, speed: 40 }).start()
        }
        onPressOut={() =>
          Animated.spring(press, { toValue: 1, useNativeDriver: true, speed: 40 }).start()
        }
        accessibilityRole={multi ? "checkbox" : "radio"}
        accessibilityState={{ checked: selected }}
        className={cn(
          "min-h-11 flex-row items-center gap-3 rounded-md border px-4 py-3.5",
          selected ? "border-brand bg-brand-tint" : "border-surface-divider bg-surface-raised"
        )}
      >
        {multi ? (
          <View
            className={cn(
              "size-6 items-center justify-center rounded-full",
              selected ? "bg-brand" : "border-2 border-surface-divider"
            )}
          >
            {selected ? (
              <Animated.View style={{ transform: [{ scale: check }] }}>
                <Icon as={IconCheck} size={14} className="text-text-onBrand" />
              </Animated.View>
            ) : null}
          </View>
        ) : null}
        <Text variant="body" className={cn("flex-1", selected && "font-sans-medium")}>
          {label}
        </Text>
        {badge ? (
          <Text
            variant="caption"
            className="rounded-sm border border-surface-divider bg-surface-raised px-1.5 py-0.5 text-text-secondary"
            style={{ letterSpacing: 0.6 }}
          >
            {badge}
          </Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
