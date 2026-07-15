/**
 * Button. Restyled from react-native-reusables: shadows removed, tap targets
 * raised to the 44pt floor, hardcoded colours swapped for tokens.
 */

import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";

const buttonVariants = cva(
  "group shrink-0 flex-row items-center justify-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-brand active:bg-brand-pressed",
        destructive: "bg-state-danger active:opacity-90",
        outline: "border border-surface-divider bg-surface-raised active:bg-surface-sunken",
        secondary: "bg-surface-sunken active:bg-surface-divider",
        ghost: "active:bg-surface-sunken",
        link: "",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-11 px-3",
        lg: "h-12 px-6",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("font-sans-medium", {
  variants: {
    variant: {
      default: "text-text-onBrand",
      destructive: "text-text-onBrand",
      outline: "text-text-primary",
      secondary: "text-text-primary",
      ghost: "text-text-primary",
      link: "text-brass-strong group-active:underline",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(props.disabled && "opacity-50", buttonVariants({ variant, size }), className)}
        role="button"
        android_ripple={null}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
