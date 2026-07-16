/**
 * GreetingHeader — Today's header: date, greeting, and the avatar that opens
 * ProfileSheet. The avatar is inert until ProfileSheet is built.
 */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Pressable, View } from "react-native";

type GreetingHeaderProps = {
  date: string;
  greeting: string;
  initials: string;
  onAvatarPress?: () => void;
};

export function GreetingHeader({ date, greeting, initials, onAvatarPress }: GreetingHeaderProps) {
  const avatar = (
    <Avatar alt="Profile">
      <AvatarFallback>
        <Text variant="label" className="text-brand">
          {initials}
        </Text>
      </AvatarFallback>
    </Avatar>
  );

  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1 gap-0.5">
        <Text variant="caption" className="text-text-muted">
          {date}
        </Text>
        <Text variant="title">{greeting}</Text>
      </View>
      {onAvatarPress ? (
        <Pressable onPress={onAvatarPress} accessibilityRole="button" accessibilityLabel="Profile">
          {avatar}
        </Pressable>
      ) : (
        avatar
      )}
    </View>
  );
}
