/**
 * Welcome — the value-prop moment and the app's one signature animation:
 * Bismillah, arch, wordmark, brass rule, then value prop settle in sequence on mount.
 */

import { Arch } from "@/components/arch";
import { GeometricPattern } from "@/components/geometricPattern";
import { Screen } from "@/components/screen";
import { ArabicText } from "@/components/ui/arabicText";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, View } from "react-native";

function rise(value: Animated.Value, delay: number) {
  return Animated.timing(value, {
    toValue: 1,
    duration: 500,
    delay,
    useNativeDriver: true,
  });
}

export default function Welcome() {
  const bismillah = useRef(new Animated.Value(0)).current;
  const arch = useRef(new Animated.Value(0)).current;
  const rule = useRef(new Animated.Value(0)).current;
  const mark = useRef(new Animated.Value(0)).current;
  const prop = useRef(new Animated.Value(0)).current;
  const cta = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (reduced) {
        [bismillah, arch, rule, mark, prop, cta].forEach((v) => v.setValue(1));
        return;
      }
      Animated.parallel([
        rise(bismillah, 0),
        rise(arch, 250),
        rise(mark, 550),
        rise(rule, 700),
        rise(prop, 900),
        rise(cta, 1150),
      ]).start();
    });
  }, [bismillah, arch, rule, mark, prop, cta]);

  const lift = (v: Animated.Value, from = 10) => ({
    opacity: v,
    transform: [
      {
        translateY: v.interpolate({
          inputRange: [0, 1],
          outputRange: [from, 0],
        }),
      },
    ],
  });

  return (
    <Screen>
      <GeometricPattern />
      <View className="flex-1 items-center justify-center px-8">
        <Animated.View style={lift(bismillah)}>
          <View className="pb-9">
            <ArabicText variant="verse" style={{ textAlign: "center" }}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </ArabicText>
          </View>
        </Animated.View>
        <Animated.View style={lift(arch, 14)}>
          <Arch size={96} />
        </Animated.View>
        <Animated.View style={lift(mark)}>
          <Text
            className="pt-7 font-serif text-text-primary"
            style={{ fontSize: 36, letterSpacing: 1.5 }}
            maxFontSizeMultiplier={1.35}
          >
            Tadabbur
          </Text>
        </Animated.View>
        <Animated.View style={{ opacity: rule, transform: [{ scaleX: rule }] }}>
          <View className="mt-3.5 h-0.5 w-14 rounded-full bg-brass" />
        </Animated.View>
        <Animated.View style={lift(prop)}>
          <Text variant="title" className="max-w-[250px] pt-6 text-center">
            Bring your questions to the Qur'an.
          </Text>
        </Animated.View>
      </View>
      <Animated.View style={lift(cta)}>
        <View className="px-5 pb-6">
          <Button className="w-full" onPress={() => router.push("/questions")}>
            <Text>Start</Text>
          </Button>
        </View>
      </Animated.View>
    </Screen>
  );
}
