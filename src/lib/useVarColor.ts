/**
 * Resolves a CSS colour token to an rgb() string for react-native-svg, which can't read
 * CSS variables. Theme-aware; falls back to the given colour before the var resolves.
 */

import { useUnstableNativeVariable } from "nativewind";

export function useVarColor(name: string, fallback: string): string {
  const value = useUnstableNativeVariable(name);
  if (!value) return fallback;
  return `rgb(${String(value).trim().split(/\s+/).join(", ")})`;
}
