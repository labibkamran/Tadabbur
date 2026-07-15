/**
 * Input — the composer and the surah search field.
 * Restyled from react-native-reusables: shadow and border removed, sunken fill.
 */

import { cn } from "@/lib/utils";
import { TextInput } from "react-native";

function Input({
  className,
  ...props
}: React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        "font-sans text-text-primary placeholder:text-text-muted bg-surface-sunken min-h-11 w-full min-w-0 flex-row items-center rounded-sm px-3.5 py-3 text-base",
        props.editable === false && "opacity-50",
        className
      )}
      maxFontSizeMultiplier={1.35}
      {...props}
    />
  );
}

export { Input };
