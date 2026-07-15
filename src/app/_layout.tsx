import "@/global.css";

import { SourceSerif4_400Regular } from "@expo-google-fonts/source-serif-4";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Uthmanic is bundled, not fetched — a system fallback renders the sacred text
  // with wrong orthography. Nothing paints until the faces have loaded.
  const [loaded] = useFonts({
    UthmanicHafs: require("../../assets/fonts/UthmanicHafs.otf"),
    SourceSerif4: SourceSerif4_400Regular,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
