/**
 * SignIn — transactional. Small mark, tight rhythm, one button, terms. Gets out of the way.
 * Auth is stubbed for now: Continue lands on home.
 */

import { Arch } from "@/components/arch";
import { GeometricPattern } from "@/components/geometricPattern";
import { GoogleMark } from "@/components/googleMark";
import { Screen } from "@/components/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { View } from "react-native";

export default function SignIn() {
  return (
    <Screen>
      <GeometricPattern />
      <View className="flex-1 items-center justify-center px-8">
        <Arch size={52} />
        <Text
          className="pt-5 font-serif text-text-primary"
          style={{ fontSize: 27, letterSpacing: 1.5 }}
          maxFontSizeMultiplier={1.35}
        >
          Tadabbur
        </Text>
        <View className="mt-3 h-0.5 w-12 rounded-full bg-brass" />
        <Text variant="caption" className="pt-2.5 text-brass-strong" style={{ letterSpacing: 1.5 }}>
          QUR'AN CHAT
        </Text>
      </View>
      <View className="gap-3.5 px-5 pb-6">
        <Button variant="outline" className="w-full gap-2.5" onPress={() => router.replace("/today")}>
          <GoogleMark size={18} />
          <Text>Continue with Google</Text>
        </Button>
        <Text variant="caption" className="text-center text-text-muted">
          By continuing you agree to the Terms and Privacy Policy.
        </Text>
      </View>
    </Screen>
  );
}
