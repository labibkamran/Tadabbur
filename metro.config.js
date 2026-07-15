/**
 * Metro + NativeWind. `inlineRem: 16` because Tailwind's rem-based spacing and
 * font sizes render 14px at NativeWind's default, breaking the 4pt scale.
 */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(getDefaultConfig(__dirname), {
  input: "./src/global.css",
  inlineRem: 16,
});
