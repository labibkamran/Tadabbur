/**
 * ArchIcon — the mihrab niche as an outline glyph for the Sakina tab.
 * Drawn on a 24 box with a 2px stroke to match the Tabler tab icons.
 */

import Svg, { Path } from "react-native-svg";

export function ArchIcon({ size = 24, color = "#6B6459" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 21 L6 11 Q6 5 12 3.5 Q18 5 18 11 L18 21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
