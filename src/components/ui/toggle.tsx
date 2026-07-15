/**
 * Toggle — the selectable unit behind ToggleGroup.
 * Restyled from react-native-reusables: shadows removed, tap targets ≥44pt.
 */

import { Icon } from "@/components/ui/icon";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import * as TogglePrimitive from "@rn-primitives/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const toggleVariants = cva(
  "group flex flex-row items-center justify-center gap-2 rounded-sm active:bg-surface-sunken",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-surface-divider bg-transparent",
      },
      size: {
        default: "h-11 min-w-11 px-3",
        sm: "h-11 min-w-11 px-2",
        lg: "h-12 min-w-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TextClassContext.Provider
      value={cn("font-sans-medium", props.pressed ? "text-text-primary" : "text-text-secondary")}
    >
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ variant, size }),
          props.disabled && "opacity-50",
          props.pressed && "bg-surface-raised border border-surface-divider",
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function ToggleIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn("size-5 shrink-0", textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleVariants };
