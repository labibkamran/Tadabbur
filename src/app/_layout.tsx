/**
 * Root layout. Gates render until fonts load — Arabic must never paint in a
 * fallback face. Each weight is its own family; RN can't synthesise weight.
 */

import "@/global.css";

import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { SourceSerif4_400Regular } from "@expo-google-fonts/source-serif-4";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    UthmanicHafs: require("../../assets/fonts/UthmanicHafs.otf"),
    SourceSerif4: SourceSerif4_400Regular,
    Inter: Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
