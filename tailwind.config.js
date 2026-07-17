/**
 * Design tokens. Colours resolve from the CSS vars in src/global.css.
 * Also maps react-native-reusables' class names onto our tokens; `brass` is
 * ours because RNR uses `accent` to mean "press background".
 */

/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // 'class' lets the Profile theme control force Paper/Night via setColorScheme; 'system'
  // still follows the OS. NativeWind maps the prefers-color-scheme block to the dark variant.
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: {
          canvas: token("surface-canvas"),
          raised: token("surface-raised"),
          sunken: token("surface-sunken"),
          divider: token("surface-divider"),
        },
        text: {
          primary: token("text-primary"),
          secondary: token("text-secondary"),
          muted: token("text-muted"),
          onBrand: token("text-on-brand"),
        },
        brand: {
          DEFAULT: token("brand-default"),
          pressed: token("brand-pressed"),
          tint: token("brand-tint"),
        },
        brass: {
          DEFAULT: token("brass-default"),
          strong: token("brass-strong"),
        },
        state: {
          danger: token("state-danger"),
        },

        background: token("surface-canvas"),
        foreground: token("text-primary"),
        card: {
          DEFAULT: token("surface-raised"),
          foreground: token("text-primary"),
        },
        popover: {
          DEFAULT: token("surface-raised"),
          foreground: token("text-primary"),
        },
        primary: {
          DEFAULT: token("brand-default"),
          foreground: token("text-on-brand"),
        },
        secondary: {
          DEFAULT: token("surface-sunken"),
          foreground: token("text-primary"),
        },
        muted: {
          DEFAULT: token("surface-sunken"),
          foreground: token("text-muted"),
        },
        accent: {
          DEFAULT: token("surface-sunken"),
          foreground: token("text-primary"),
        },
        destructive: {
          DEFAULT: token("state-danger"),
          foreground: token("text-on-brand"),
        },
        border: token("surface-divider"),
        input: token("surface-divider"),
        ring: token("brand-default"),
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        bubble: "18px",
        pill: "9999px",
      },
      fontFamily: {
        sans: ["Inter"],
        "sans-medium": ["Inter-Medium"],
        serif: ["SourceSerif4"],
        uthmanic: ["UthmanicHafs"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
