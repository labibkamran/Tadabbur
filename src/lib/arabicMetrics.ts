/**
 * Arabic sizing maths. Pure — no React, no RN — so it can be asserted directly.
 * The 2.0 line-height ratio must hold at every slider value; tashkīl collides below it.
 */

export const ARABIC_RATIO = 2;
export const ARABIC_SCALE_MIN = 0.85;
export const ARABIC_SCALE_MAX = 1.4;

export const ARABIC_SIZE = {
  verse: 24,
  verseLarge: 30,
} as const;

export type ArabicVariant = keyof typeof ARABIC_SIZE;

export function clampArabicScale(scale: number): number {
  if (!Number.isFinite(scale)) return 1;
  return Math.min(Math.max(scale, ARABIC_SCALE_MIN), ARABIC_SCALE_MAX);
}

export function arabicMetrics(variant: ArabicVariant, scale: number) {
  const clamped = clampArabicScale(scale);
  const size = ARABIC_SIZE[variant];
  return {
    fontSize: size * clamped,
    lineHeight: size * ARABIC_RATIO * clamped,
  };
}
