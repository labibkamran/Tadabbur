/**
 * Avatar — header (36pt) and ProfileSheet (64pt).
 * Falls back to initials, which the states matrix treats as normal, not an error.
 */

import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@rn-primitives/avatar";

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cn("relative size-9 shrink-0 overflow-hidden rounded-pill", className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image className={cn("aspect-square size-full", className)} {...props} />;
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "bg-brand-tint flex size-full flex-row items-center justify-center rounded-pill",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
