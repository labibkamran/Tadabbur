/**
 * OAuth landing. Google → Supabase redirects here (tadabbur://auth/callback?code=…).
 * We exchange the code for a session, then drop into the app — a brief spinner, never
 * the "Unmatched Route" screen. This is the single place the code is exchanged.
 */
import { Screen } from "@/components/screen";
import { supabase } from "@/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthCallback() {
  const { code } = useLocalSearchParams<{ code?: string }>();

  useEffect(() => {
    (async () => {
      if (!code) {
        router.replace("/signIn");
        return;
      }
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      router.replace(error ? "/signIn" : "/today");
    })();
  }, [code]);

  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    </Screen>
  );
}
