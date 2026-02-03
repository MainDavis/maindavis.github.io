/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: "#000000",
          green: "#ef4444",
          cyan: "#9ca3af",
          orange: "#f97316",
          yellow: "#eab308",
          gray: "#111111",
          border: "#2f2f2f",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(239, 68, 68, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)",
      },
    },
  },
  plugins: [],
};
