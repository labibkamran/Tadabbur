/**
 * Arabic text size — the only control over Arabic sizing, driven by the Profile control.
 * Seeds from the system font scale, hydrates any saved size on launch, then persists.
 */

import { clampArabicScale } from "@/lib/arabicMetrics";
import { loadSetting, saveSetting } from "@/lib/settings";
import * as React from "react";
import { useWindowDimensions } from "react-native";

type ArabicScale = {
  scale: number;
  setScale: (next: number) => void;
};

const ArabicScaleContext = React.createContext<ArabicScale | null>(null);

export function ArabicScaleProvider({ children }: { children: React.ReactNode }) {
  const { fontScale } = useWindowDimensions();
  const [scale, setScaleState] = React.useState(() => clampArabicScale(fontScale));

  // hydrate the saved size once; until it resolves the system-seeded default shows
  React.useEffect(() => {
    loadSetting("arabicScale").then((v) => {
      const n = v ? Number(v) : NaN;
      if (Number.isFinite(n)) setScaleState(clampArabicScale(n));
    });
  }, []);

  const setScale = React.useCallback((next: number) => {
    const clamped = clampArabicScale(next);
    setScaleState(clamped);
    saveSetting("arabicScale", String(clamped));
  }, []);

  const value = React.useMemo(() => ({ scale, setScale }), [scale, setScale]);

  return <ArabicScaleContext.Provider value={value}>{children}</ArabicScaleContext.Provider>;
}

export function useArabicScale(): ArabicScale {
  const context = React.useContext(ArabicScaleContext);
  if (context === null) {
    throw new Error("useArabicScale must be used within an ArabicScaleProvider");
  }
  return context;
}
