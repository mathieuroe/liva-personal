import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primärfarbe – brand-dark ist die Hauptfarbe
        brand: {
          DEFAULT: "#0F6E56",   // Hauptfarbe: Buttons, Links, aktive Elemente
          hover: "#085041",     // Hover-State
          subtle: "#1D9E75",    // Akzente, Icons, sekundäre Elemente
          mid: "#9FE1CB",       // Trennlinien, Borders auf hellem Grund
          light: "#E1F5EE",     // Hintergründe, Badges, Highlights
          50: "#f0fdf8",        // Ganz helle Flächen, Sektionshintergründe
        },
        // Neutrals – leicht grünlich-grau, passend zur Primärfarbe
        neutral: {
          900: "#0F1F1A",       // Überschriften, primärer Text
          700: "#2D4A3E",       // Sekundärer Text
          500: "#5C7A6F",       // Hilfstexte, Placeholder
          300: "#B8CEC8",       // Borders, Divider
          100: "#EDF3F1",       // Hintergründe
          50:  "#F6FAF8",       // Seiten-Hintergrund
        },
        // Statusfarben
        success: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
          dark: "#15803D",
        },
        warning: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
          dark: "#B45309",
        },
        danger: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
          dark: "#B91C1C",
        },
        info: {
          DEFAULT: "#0F6E56",   // = brand, Info nutzt Primärfarbe
          light: "#E1F5EE",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        card: "12px",
        "card-lg": "20px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.12)",
        "card-active": "0 0 0 2px #0F6E56, 0 4px 20px rgba(15,110,86,0.15)",
        soft: "0 2px 12px rgba(0,0,0,0.04)",
      },
      fontSize: {
        "display": ["3.5rem", { lineHeight: "1.1" }],
        "h1": ["2.5rem", { lineHeight: "1.2" }],
        "h2": ["1.875rem", { lineHeight: "1.25" }],
        "h3": ["1.375rem", { lineHeight: "1.35" }],
        "h4": ["1.125rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        section: "5rem",
        "section-sm": "3rem",
      },
    },
  },
  plugins: [],
};

export default config;
