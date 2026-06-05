import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        mist: "#e8f4ff",
        signal: "#7c3aed",
        pulse: "#14b8a6"
      },
      boxShadow: {
        glow: "0 0 80px rgba(20, 184, 166, 0.22)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseRing: {
          "0%": { transform: "scale(0.92)", opacity: "0.45" },
          "100%": { transform: "scale(1.35)", opacity: "0" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulseRing: "pulseRing 2.6s ease-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
