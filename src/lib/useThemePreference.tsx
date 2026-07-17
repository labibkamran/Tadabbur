/**
 * Theme preference — System, Paper (light), or Night (dark). Applies the saved choice
 * through nativewind on launch and persists any change. Provided once at the app root.
 */

import { loadSetting, saveSetting } from "@/lib/settings";
import { useColorScheme } from "nativewind";
import * as React from "react";

export type ThemeChoice = "system" | "light" | "dark";

type ThemePref = { choice: ThemeChoice; setChoice: (c: ThemeChoice) => void };

const ThemePrefContext = React.createContext<ThemePref | null>(null);

export function ThemePreferenceProvider({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useColorScheme();
  const [choice, setChoiceState] = React.useState<ThemeChoice>("system");

  React.useEffect(() => {
    loadSetting("theme").then((v) => {
      if (v === "light" || v === "dark" || v === "system") {
        setChoiceState(v);
        setColorScheme(v);
      }
    });
  }, [setColorScheme]);

  const setChoice = React.useCallback(
    (c: ThemeChoice) => {
      setChoiceState(c);
      setColorScheme(c);
      saveSetting("theme", c);
    },
    [setColorScheme]
  );

  const value = React.useMemo(() => ({ choice, setChoice }), [choice, setChoice]);

  return <ThemePrefContext.Provider value={value}>{children}</ThemePrefContext.Provider>;
}

export function useThemePreference(): ThemePref {
  const ctx = React.useContext(ThemePrefContext);
  if (ctx === null) {
    throw new Error("useThemePreference must be used within a ThemePreferenceProvider");
  }
  return ctx;
}
