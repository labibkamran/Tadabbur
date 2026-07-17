/**
 * TapHint — a quietly pulsing "tap to continue". Discoverable, but still calm.
 * Static when reduce-motion is on.
 */

import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function TapHint({ label = "Tap to continue" }: { label?: string }) {
  const reduced = useReducedMotion();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduced) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduced, pulse]);

  return (
    <Animated.View style={{ opacity: pulse }}>
      <Text variant="caption" className="text-text-secondary">
        {label}
      </Text>
    </Animated.View>
  );
}
