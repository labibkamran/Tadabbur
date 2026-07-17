/**
 * StreamingDots — three brass dots breathing in sequence while a reflection is being
 * prepared. The one "thinking" state before words arrive. Static under reduce-motion.
 */

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const DOTS = [0, 1, 2];

export function StreamingDots() {
  const reduced = useReducedMotion();
  const vals = useRef(DOTS.map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (reduced) return;
    const loops = vals.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 180),
          Animated.timing(v, { toValue: 1, duration: 420, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0.3, duration: 420, useNativeDriver: true }),
          Animated.delay((DOTS.length - i) * 180),
        ])
      )
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [reduced, vals]);

  return (
    <View className="flex-row gap-1.5 py-1" accessibilityLabel="Preparing a reflection">
      {vals.map((v, i) => (
        <Animated.View key={i} style={{ opacity: v }}>
          <View className="size-2 rounded-full bg-brass" />
        </Animated.View>
      ))}
    </View>
  );
}
