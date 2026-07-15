/**
 * Screen — the safe-area + canvas wrapper every screen sits in.
 * Insets applied as padding so nativewind styles the background without cssInterop guesswork.
 */

import { cn } from "@/lib/utils";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = React.ComponentProps<typeof View> & {
  top?: boolean;
  bottom?: boolean;
};

export function Screen({ className, style, top = true, bottom = true, ...props }: ScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={cn("flex-1 bg-surface-canvas", className)}
      style={[{ paddingTop: top ? insets.top : 0, paddingBottom: bottom ? insets.bottom : 0 }, style]}
      {...props}
    />
  );
}
