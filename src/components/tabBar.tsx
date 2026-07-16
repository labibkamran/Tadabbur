/**
 * TabBar — the app's bottom navigation, shared across all four tabs.
 * A matte brand-tint pill sits behind the active tab; tap to slide it, or drag it
 * across the tabs and it snaps to the nearest one. Not Material: no ripple, no gloss.
 */

import { ArchIcon } from "@/components/archIcon";
import { Text } from "@/components/ui/text";
import { useVarColor } from "@/lib/useVarColor";
import { IconBook, IconMessageCircle, IconSun } from "@tabler/icons-react-native";
import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Pressable, View } from "react-native";
import {
  PanGestureHandler,
  State,
  type PanGestureHandlerGestureEvent,
  type PanGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconProps = { size: number; color: string };

const TAB_META: Record<string, { label: string; Icon: (p: IconProps) => React.ReactElement }> = {
  today: { label: "Today", Icon: (p) => <IconSun {...p} strokeWidth={2} /> },
  sakina: { label: "Sakina", Icon: (p) => <ArchIcon {...p} /> },
  ask: { label: "Ask", Icon: (p) => <IconMessageCircle {...p} strokeWidth={2} /> },
  read: { label: "Read", Icon: (p) => <IconBook {...p} strokeWidth={2} /> },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const brand = useVarColor("--brand-default", "#14493C");
  const muted = useVarColor("--text-secondary", "#6B6459");
  const tint = useVarColor("--brand-tint", "#E7EFEB");

  const routes = state.routes.filter((r) => TAB_META[r.name]);
  const activeKey = state.routes[state.index]?.key;
  const activeIndex = Math.max(
    0,
    routes.findIndex((r) => r.key === activeKey)
  );

  const [tabWidth, setTabWidth] = useState(0);
  const pillX = useRef(new Animated.Value(0)).current;
  const dragBase = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((r) => (reduced.current = r));
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", (r) => (reduced.current = r));
    return () => sub.remove();
  }, []);

  const settle = (target: number) => {
    if (reduced.current) {
      pillX.setValue(target);
      return;
    }
    Animated.spring(pillX, { toValue: target, useNativeDriver: false, speed: 16, bounciness: 6 }).start();
  };

  useEffect(() => {
    if (tabWidth > 0) settle(activeIndex * tabWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, tabWidth]);

  const navigateTo = (route: (typeof routes)[number]) => {
    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
    if (!event.defaultPrevented) navigation.navigate(route.name);
  };

  const onGestureEvent = (e: PanGestureHandlerGestureEvent) => {
    pillX.setValue(dragBase.current + e.nativeEvent.translationX);
  };

  const onStateChange = (e: PanGestureHandlerStateChangeEvent) => {
    const { state: gs, translationX } = e.nativeEvent;
    if (gs === State.BEGAN) {
      dragBase.current = activeIndex * tabWidth;
    } else if (gs === State.END || gs === State.CANCELLED || gs === State.FAILED) {
      const target = Math.min(
        Math.max(Math.round((dragBase.current + translationX) / tabWidth), 0),
        routes.length - 1
      );
      settle(target * tabWidth);
      if (target !== activeIndex) navigateTo(routes[target]);
    }
  };

  return (
    <View
      className="border-t border-surface-divider bg-surface-canvas"
      style={{ paddingBottom: insets.bottom }}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onStateChange}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View
          style={{ flexDirection: "row", paddingTop: 8, paddingBottom: 8 }}
          onLayout={(e) => setTabWidth(e.nativeEvent.layout.width / routes.length)}
        >
          {tabWidth > 0 ? (
            <Animated.View
              pointerEvents="none"
              style={{
                position: "absolute",
                left: 8,
                top: 6,
                bottom: 6,
                width: tabWidth - 16,
                borderRadius: 16,
                backgroundColor: tint,
                transform: [{ translateX: pillX }],
              }}
            />
          ) : null}

          {routes.map((route, index) => {
            const meta = TAB_META[route.name];
            const focused = index === activeIndex;
            const color = focused ? brand : muted;
            return (
              <Pressable
                key={route.key}
                onPress={() => navigateTo(route)}
                accessibilityRole="button"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={meta.label}
                className="min-h-11 flex-1 items-center justify-center gap-1 py-1"
              >
                <meta.Icon size={23} color={color} />
                <Text variant="caption" className={focused ? "text-brand" : "text-text-secondary"}>
                  {meta.label}
                </Text>
              </Pressable>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
