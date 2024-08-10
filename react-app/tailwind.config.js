/** @type {import('tailwindcss').Config} */
// import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      // カラー設定
      colors: {
        // 基本色
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        black: "#000000",
        // グレースケールの詳細設定
        gray: {
          900: "#1A1A1A",
          800: "#333333",
          700: "#4D4D4D",
          600: "#666666",
          536: "#767676",
          500: "#7F7F7F",
          400: "#999999",
          300: "#B3B3B3",
          200: "#CCCCCC",
          100: "#E6E6E6",
          50: "#F2F2F2",
        },
        white: "#FFFFFF",
      },
      // フォントファミリー設定
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      // フォントサイズ設定
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.03em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.03em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.03em" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0.03em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "0.03em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "0.03em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "0.03em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "0.03em" }],
        "5xl": ["3rem", { lineHeight: "1", letterSpacing: "0.03em" }],
      },
    },
  },
  plugins: [],
}

