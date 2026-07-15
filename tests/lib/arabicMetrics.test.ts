/**
 * Asserts the 2.0 ratio survives clamping at both slider extremes. Run: npm test
 */

import {
  ARABIC_RATIO,
  ARABIC_SCALE_MAX,
  ARABIC_SCALE_MIN,
  ARABIC_SIZE,
  arabicMetrics,
  clampArabicScale,
} from "../../src/lib/arabicMetrics";

function ok(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function eq(actual: number, expected: number, message: string) {
  if (actual !== expected) throw new Error(`${message} — expected ${expected}, got ${actual}`);
}

const variants = Object.keys(ARABIC_SIZE) as (keyof typeof ARABIC_SIZE)[];

for (const variant of variants) {
  for (const scale of [ARABIC_SCALE_MIN, 0.9, 1, 1.2, ARABIC_SCALE_MAX]) {
    const { fontSize, lineHeight } = arabicMetrics(variant, scale);
    ok(
      Math.abs(lineHeight / fontSize - ARABIC_RATIO) < 1e-9,
      `ratio broke at ${variant} @ ${scale}: ${lineHeight}/${fontSize}`
    );
  }
}

eq(clampArabicScale(0.1), ARABIC_SCALE_MIN, "below range must clamp up");
eq(clampArabicScale(3), ARABIC_SCALE_MAX, "above range must clamp down");
eq(clampArabicScale(1), 1, "in range must pass through");
eq(clampArabicScale(NaN), 1, "NaN must not poison sizing");

for (const scale of [ARABIC_SCALE_MIN, ARABIC_SCALE_MAX]) {
  const { fontSize, lineHeight } = arabicMetrics("verseLarge", scale);
  console.log(
    `  verseLarge @ ${scale}: ${fontSize.toFixed(2)}/${lineHeight.toFixed(2)} = ${(lineHeight / fontSize).toFixed(2)}`
  );
}

console.log("arabicMetrics ok");
