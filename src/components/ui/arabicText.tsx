/**
 * ArabicText — Qur'anic Arabic only. Ignores system font scaling by design; the
 * Settings slider is the sole control, so the two can never multiply.
 */

import { arabicMetrics, type ArabicVariant } from "@/lib/arabicMetrics";
import { useArabicScale } from "@/lib/useArabicScale";
import { cn } from "@/lib/utils";
import { Text as RNText } from "react-native";

type ArabicTextProps = React.ComponentProps<typeof RNText> & {
  variant?: ArabicVariant;
};

function ArabicText({ className, variant = "verse", style, ...props }: ArabicTextProps) {
  const { scale } = useArabicScale();
  const { fontSize, lineHeight } = arabicMetrics(variant, scale);

  return (
    <RNText
      className={cn("font-uthmanic text-text-primary", className)}
      style={[{ fontSize, lineHeight, writingDirection: "rtl", textAlign: "right" }, style]}
      allowFontScaling={false}
      accessibilityLanguage="ar"
      {...props}
    />
  );
}

export { ArabicText };
export type { ArabicTextProps };
