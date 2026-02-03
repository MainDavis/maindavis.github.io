/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: "#000000",
          green: "#4ade80",
          cyan: "#22d3ee",
          orange: "#fb923c",
          yellow: "#facc15",
          gray: "#1a1a1a",
          border: "#2a2a2a",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(74, 222, 128, 0.3), 0 0 20px rgba(74, 222, 128, 0.1)",
      },
    },
  },
  plugins: [],
};
