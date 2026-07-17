/**
 * BreathingArch — the mihrab niche as a breathing mark for the Session's first beat.
 * Expands and contracts slowly to settle the breath. Still when reduce-motion is on.
 */

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useVarColor } from "@/lib/useVarColor";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";

export function BreathingArch({ size = 108 }: { size?: number }) {
  const reduced = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const color = useVarColor("--brass-default", "#B4884D");

  useEffect(() => {
    if (reduced) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.12,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduced, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6 21 L6 11 Q6 5 12 3.5 Q18 5 18 11 L18 21"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
}
