/**
 * Arabic text size — the only control over Arabic sizing, driven by Settings' slider.
 * Seeds from the system font scale once, then the slider owns it. Not yet persisted;
 * storage arrives with the Settings screen.
 */

import { clampArabicScale } from "@/lib/arabicMetrics";
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

  const setScale = React.useCallback((next: number) => {
    setScaleState(clampArabicScale(next));
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
