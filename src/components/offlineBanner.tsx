/**
 * OfflineBanner — a slim, quiet notice shown only where it matters: Ask, the one surface
 * that needs a connection. Renders nothing when online, or anywhere else in the app.
 */

import { Text } from "@/components/ui/text";
import { useOnline } from "@/lib/useOnline";
import { View } from "react-native";

export function OfflineBanner() {
  const online = useOnline();
  if (online) return null;

  return (
    <View className="border-b border-surface-divider bg-surface-sunken px-4 py-2">
      <Text variant="caption" className="text-text-secondary">
        You're offline. Ask needs a connection; the rest of the app works without one.
      </Text>
    </View>
  );
}
