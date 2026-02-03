/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: "#000000",
          green: "#ff3131",
          cyan: "#a6abb3",
          orange: "#f97316",
          yellow: "#eab308",
          gray: "#111111",
          border: "#2f2f2f",
          light: "#f2f2f2",
          muted: "#c7c7c7",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(255, 49, 49, 0.3), 0 0 20px rgba(255, 49, 49, 0.12)",
        "glow-strong":
          "0 0 12px rgba(255, 49, 49, 0.55), 0 0 28px rgba(255, 49, 49, 0.25)",
      },
    },
  },
  plugins: [],
};
