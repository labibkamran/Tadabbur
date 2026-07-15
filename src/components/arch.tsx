/**
 * The mihrab arch — the brand mark. Fixed brand colours by design: a logo does not
 * theme-shift, so these hexes are the mark's own palette, not app tokens.
 */

import Svg, { Path, Rect } from "react-native-svg";

const GREEN = "#14493C";
const PAPER = "#FBF8F3";
const BRASS = "#B4884D";

export function Arch({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 110 110" accessibilityRole="image">
      <Rect x={0} y={0} width={110} height={110} rx={26} fill={GREEN} />
      <Path d="M24 80 L24 50 Q24 24 55 18 Q86 24 86 50 L86 80 Z" fill={PAPER} />
      <Rect x={24} y={87} width={62} height={3} rx={1.5} fill={BRASS} />
    </Svg>
  );
}
