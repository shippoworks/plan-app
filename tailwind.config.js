/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F0",
        ink: "#2D2D2D",
        mute: "#6B6B6B",
        primary: "#FF6B9D",
        sun: "#FFD93D",
        lime: "#6BCB77",
        sky: "#4D96FF",
        lav: "#C77DFF",
        card: {
          pink: "#FFE5EC",
          blue: "#E5F4FF",
          yellow: "#FFF4D6",
          green: "#E8F8E0",
          purple: "#F0E5FF",
          orange: "#FFE4D1",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans JP",
          "-apple-system",
          "BlinkMacSystemFont",
          "Hiragino Kaku Gothic ProN",
          "sans-serif",
        ],
        mono: ["Space Grotesk", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "24px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.08)",
        cardHover: "0 12px 32px rgba(0,0,0,0.12)",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0)" },
          "60%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        pop: "pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
