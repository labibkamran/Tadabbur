/**
 * Text — every non-Arabic string. Arabic uses <ArabicText>.
 * Line height is a ratio resolved against fontScale, because RN scales
 * fontSize but not lineHeight.
 */

import { cn } from "@/lib/utils";
import { Slot } from "@rn-primitives/slot";
import * as React from "react";
import { Text as RNText, useWindowDimensions, type Role } from "react-native";

const FONT_SCALE_CEILING = 1.35;

const TYPE = {
  body: { size: 16, ratio: 1.7, face: "font-sans" },
  bubble: { size: 15, ratio: 1.6, face: "font-sans" },
  title: { size: 22, ratio: 1.3, face: "font-sans-medium" },
  label: { size: 13, ratio: 1.4, face: "font-sans-medium" },
  caption: { size: 12, ratio: 1.35, face: "font-sans-medium" },
  translation: { size: 15, ratio: 1.6, face: "font-serif" },
} as const;

type TextVariant = keyof typeof TYPE;

const ROLE: Partial<Record<TextVariant, Role>> = {
  title: "heading",
};

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = React.ComponentProps<typeof RNText> & {
  asChild?: boolean;
  variant?: TextVariant;
};

function Text({ className, asChild = false, variant = "body", style, ...props }: TextProps) {
  const { fontScale } = useWindowDimensions();
  const textClass = React.useContext(TextClassContext);
  const { size, ratio, face } = TYPE[variant];
  const scale = Math.min(fontScale, FONT_SCALE_CEILING);
  const Component = asChild ? Slot : RNText;

  return (
    <Component
      className={cn(face, "text-text-primary", textClass, className)}
      style={[{ fontSize: size, lineHeight: size * ratio * scale }, style]}
      role={ROLE[variant]}
      maxFontSizeMultiplier={FONT_SCALE_CEILING}
      {...props}
    />
  );
}

export { FONT_SCALE_CEILING, Text, TextClassContext, TYPE };
export type { TextVariant };
