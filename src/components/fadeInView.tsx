/**
 * FadeInView — fades and rises its children in on mount, for gentle screen-entrance
 * choreography. Reduced-motion aware: snaps to visible instead of animating.
 */

import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated } from "react-native";

export function FadeInView({
  delay = 0,
  rise = 10,
  children,
}: {
  delay?: number;
  rise?: number;
  children: React.ReactNode;
}) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (reduced) {
        v.setValue(1);
        return;
      }
      Animated.timing(v, { toValue: 1, duration: 450, delay, useNativeDriver: true }).start();
    });
  }, [v, delay]);

  return (
    <Animated.View
      style={{
        opacity: v,
        transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [rise, 0] }) }],
      }}
    >
      {children}
    </Animated.View>
  );
}
