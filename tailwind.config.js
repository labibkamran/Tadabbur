/** @type {import('tailwindcss').Config} */
// Colors resolve from the CSS variables in src/global.css, so `bg-surface-canvas`
// is correct in both themes and dark mode needs no `dark:` variant.
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: {
          canvas: "rgb(var(--surface-canvas) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
          sunken: "rgb(var(--surface-sunken) / <alpha-value>)",
          divider: "rgb(var(--surface-divider) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
          onBrand: "rgb(var(--text-on-brand) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--brand-default) / <alpha-value>)",
          pressed: "rgb(var(--brand-pressed) / <alpha-value>)",
          tint: "rgb(var(--brand-tint) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-default) / <alpha-value>)",
          strong: "rgb(var(--accent-strong) / <alpha-value>)",
        },
        state: {
          danger: "rgb(var(--state-danger) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["SourceSerif4"], // translation layer + wordmark
        uthmanic: ["UthmanicHafs"], // Qur'anic Arabic. Bundled, never fetched.
      },
    },
  },
  plugins: [],
};
