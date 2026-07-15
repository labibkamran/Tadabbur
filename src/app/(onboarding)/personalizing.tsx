/**
 * Personalizing — the funnel paying out honestly. Each line gets an even, readable
 * dwell; the brass ring fills steadily over the same span, then advances.
 */

import { GeometricPattern } from "@/components/geometricPattern";
import { Screen } from "@/components/screen";
import { Text } from "@/components/ui/text";
import { PERSONALIZING_LINES } from "@/data/onboarding";
import { useVarColor } from "@/lib/useVarColor";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const R = 30;
const CIRCUMFERENCE = 2 * Math.PI * R;
const LINE_MS = 1500;
const TOTAL = LINE_MS * PERSONALIZING_LINES.length;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Personalizing() {
  const [line, setLine] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  const track = useVarColor("--surface-divider", "#E5DFD4");
  const arc = useVarColor("--brass-default", "#B4884D");

  useEffect(() => {
    const timers = PERSONALIZING_LINES.slice(1).map((_, i) =>
      setTimeout(() => setLine(i + 1), (i + 1) * LINE_MS)
    );
    timers.push(setTimeout(() => router.replace("/signIn"), TOTAL));

    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (reduced) {
        progress.setValue(1);
        return;
      }
      Animated.timing(progress, {
        toValue: 1,
        duration: TOTAL,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      timers.forEach(clearTimeout);
      progress.stopAnimation();
    };
  }, [progress]);

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }).start();
  }, [line, fade]);

  const dashoffset = progress.interpolate({ inputRange: [0, 1], outputRange: [CIRCUMFERENCE, 0] });

  return (
    <Screen>
      <GeometricPattern />
      <View className="flex-1 items-center justify-center gap-7 px-8">
        <Svg width={72} height={72} viewBox="0 0 72 72">
          <G rotation={-90} origin="36, 36">
            <Circle cx={36} cy={36} r={R} stroke={track} strokeWidth={3} fill="none" />
            <AnimatedCircle
              cx={36}
              cy={36}
              r={R}
              stroke={arc}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashoffset}
              fill="none"
            />
          </G>
        </Svg>
        <Animated.View style={{ opacity: fade }}>
          <Text variant="body" className="text-center text-text-secondary">
            {PERSONALIZING_LINES[line]}
          </Text>
        </Animated.View>
      </View>
    </Screen>
  );
}
