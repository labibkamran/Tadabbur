/**
 * Profile — the account and settings sheet, opened from the avatar. Quiet, not a
 * dashboard: who you are, Arabic text size (shown live on the Bismillah), theme, and the
 * text's attribution. Settings persist. A modal, dismissed with the close button.
 */

import { Screen } from "@/components/screen";
import { ArabicText } from "@/components/ui/arabicText";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggleGroup";
import { loadSurah } from "@/data/curated/quran";
import { goBack } from "@/lib/nav";
import { useAuth } from "@/lib/useAuth";
import { useArabicScale } from "@/lib/useArabicScale";
import { useThemePreference, type ThemeChoice } from "@/lib/useThemePreference";
import { IconX } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, View } from "react-native";

const SIZE_STEPS = [
  { key: "s", label: "S", scale: 0.85 },
  { key: "m", label: "M", scale: 1.0 },
  { key: "l", label: "L", scale: 1.2 },
  { key: "xl", label: "XL", scale: 1.4 },
] as const;

const THEMES: { key: ThemeChoice; label: string }[] = [
  { key: "system", label: "System" },
  { key: "light", label: "Paper" },
  { key: "dark", label: "Night" },
];

function nearestStep(scale: number) {
  return SIZE_STEPS.reduce((a, b) =>
    Math.abs(b.scale - scale) < Math.abs(a.scale - scale) ? b : a
  );
}

export default function Profile() {
  const { scale, setScale } = useArabicScale();
  const { choice, setChoice } = useThemePreference();
  const { session, signOut, profile, initials } = useAuth();
  const bismillah = useMemo(() => loadSurah(1)[0]?.arabic ?? "", []);

  const name = profile?.name ?? "Guest";
  const subtitle = profile?.email ?? "Reading as a guest";

  const onSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <Screen>
      <View className="flex-row items-center border-b border-surface-divider px-4 py-3">
        <Text variant="title" className="flex-1">
          Profile
        </Text>
        <Pressable
          onPress={() => goBack("/ask")}
          accessibilityRole="button"
          accessibilityLabel="Close"
          className="-mr-2.5 size-11 items-center justify-center active:opacity-60"
        >
          <Icon as={IconX} size={22} className="text-text-secondary" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="gap-8 px-4 py-6">
        <View className="items-center gap-2">
          <Avatar alt="Profile" className="size-16">
            <AvatarFallback>
              <Text variant="title" className="text-brand">
                {initials}
              </Text>
            </AvatarFallback>
          </Avatar>
          <Text variant="body" className="font-sans-medium">
            {name}
          </Text>
          <Text variant="caption" className="text-text-muted">
            {subtitle}
          </Text>
        </View>

        <View className="gap-3">
          <Text variant="label" className="text-text-muted">
            Arabic text size
          </Text>
          <View className="items-center rounded-md bg-surface-sunken px-4 py-5">
            <ArabicText variant="verse">{bismillah}</ArabicText>
          </View>
          <ToggleGroup
            type="single"
            value={nearestStep(scale).key}
            onValueChange={(v) => {
              const step = SIZE_STEPS.find((s) => s.key === v);
              if (step) setScale(step.scale);
            }}
          >
            {SIZE_STEPS.map((s, i) => (
              <ToggleGroupItem
                key={s.key}
                value={s.key}
                isFirst={i === 0}
                isLast={i === SIZE_STEPS.length - 1}
              >
                <Text>{s.label}</Text>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </View>

        <View className="gap-3">
          <Text variant="label" className="text-text-muted">
            Theme
          </Text>
          <ToggleGroup
            type="single"
            value={choice}
            onValueChange={(v) => {
              if (v) setChoice(v as ThemeChoice);
            }}
          >
            {THEMES.map((t, i) => (
              <ToggleGroupItem
                key={t.key}
                value={t.key}
                isFirst={i === 0}
                isLast={i === THEMES.length - 1}
              >
                <Text>{t.label}</Text>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </View>

        <View className="gap-2">
          <Text variant="label" className="text-text-muted">
            About
          </Text>
          <AboutRow label="Qur'an text" value="KFGQPC Uthmani (Tanzil)" />
          <AboutRow label="Translation" value="Saheeh International" />
          <AboutRow label="Version" value="1.0.0" />
        </View>

        {session ? (
          <Pressable
            onPress={onSignOut}
            accessibilityRole="button"
            accessibilityLabel="Sign out"
            className="min-h-11 flex-row items-center justify-center active:opacity-60"
          >
            <Text variant="body" className="text-state-danger">
              Sign out
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

function AboutRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Text variant="body" className="text-text-secondary">
        {label}
      </Text>
      <Text variant="caption" className="text-text-muted">
        {value}
      </Text>
    </View>
  );
}
