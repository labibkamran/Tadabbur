/**
 * Icon — NativeWind className support for Tabler glyphs.
 * Retyped from react-native-reusables, which ships it typed to lucide.
 */

import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { Icon as TablerIcon, IconProps } from "@tabler/icons-react-native";
import { cssInterop } from "nativewind";
import * as React from "react";

type Props = IconProps & {
  as: TablerIcon;
} & React.RefAttributes<TablerIcon>;

function IconImpl({ as: IconComponent, ...props }: Props) {
  return <IconComponent {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: "size",
      width: "size",
    },
  },
});

function Icon({ as: IconComponent, className, size = 20, ...props }: Props) {
  const textClass = React.useContext(TextClassContext);
  return (
    <IconImpl
      as={IconComponent}
      className={cn("text-text-primary", textClass, className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };
