/**
 * Root layout. Gates render until fonts load, and themes the navigator background
 * to the canvas so fade transitions don't flash white in dark mode.
 */

import "@/global.css";

import { ArabicScaleProvider } from "@/lib/useArabicScale";
import { useVarColor } from "@/lib/useVarColor";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { SourceSerif4_400Regular } from "@expo-google-fonts/source-serif-4";
import { useFonts } from "expo-font";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    UthmanicHafs: require("../../assets/fonts/UthmanicHafs.otf"),
    SourceSerif4: SourceSerif4_400Regular,
    Inter: Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
  });

  const { colorScheme } = useColorScheme();
  const canvas = useVarColor("--surface-canvas", "#FBF8F3");
  const navTheme = useMemo(
    () => ({
      ...DefaultTheme,
      dark: colorScheme === "dark",
      colors: { ...DefaultTheme.colors, background: canvas, card: canvas },
    }),
    [colorScheme, canvas]
  );

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <ArabicScaleProvider>
        <ThemeProvider value={navTheme}>
          <View className="flex-1 bg-surface-canvas">
            <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
          </View>
        </ThemeProvider>
      </ArabicScaleProvider>
    </SafeAreaProvider>
  );
}
