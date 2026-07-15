/**
 * GeometricPattern — a faint tessellating 8-point star (khatim) watermark.
 * Aniconic Islamic geometry in a single brass token at ~6% opacity, behind content.
 */

import { useVarColor } from "@/lib/useVarColor";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, Path, Pattern, Rect } from "react-native-svg";

const TILE = 72;

function starPath(size: number): string {
  const c = size / 2;
  const outer = size / 2;
  const inner = size * 0.21;
  const points: string[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 8) * i - Math.PI / 2;
    const x = c + r * Math.cos(angle);
    const y = c + r * Math.sin(angle);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join(" L")} Z`;
}

export function GeometricPattern({ opacity = 0.06 }: { opacity?: number }) {
  const color = useVarColor("--brass-default", "#B4884D");
  const d = starPath(TILE);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id="khatim" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
            <Path d={d} stroke={color} strokeOpacity={opacity} strokeWidth={0.75} fill="none" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#khatim)" />
      </Svg>
    </View>
  );
}
