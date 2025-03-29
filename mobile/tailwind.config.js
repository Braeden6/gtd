import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["app/**/*.{tsx,jsx,ts,js}", "components/**/*.{tsx,jsx,ts,js}"],
  presets: [require("nativewind/preset")],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator|muted|border)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary|card)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--cardForeground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popoverForeground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primaryForeground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondaryForeground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--mutedForeground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accentForeground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructiveForeground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ["SFPro", "sans-serif"],
        heading: ["SFPro", "sans-serif"],
        body: ["SFPro", "sans-serif"],
        mono: ["SpaceMono", "monospace"],
        roboto: ["Roboto", "sans-serif"],
        sfpro: ["SFPro", "sans-serif"],
        bold: ["SFPro-Bold", "sans-serif"],
      },
      fontWeight: {
        extrablack: "950",
      },
      fontSize: {
        "2xs": "10px",
      },
      boxShadow: {
        "hard-1": "-2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-2": "0px 3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-3": "2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-4": "0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-5": "0px 2px 10px 0px rgba(38, 38, 38, 0.10)",
        "soft-1": "0px 0px 10px rgba(38, 38, 38, 0.1)",
        "soft-2": "0px 0px 20px rgba(38, 38, 38, 0.2)",
        "soft-3": "0px 0px 30px rgba(38, 38, 38, 0.1)",
        "soft-4": "0px 0px 40px rgba(38, 38, 38, 0.1)",
        "soft": "var(--shadow-soft)",
        "medium": "var(--shadow-medium)",
        "hard": "var(--shadow-hard)",
      },
      borderRadius: {
        DEFAULT: "8px",
        "xs": "4px",
        "sm": "6px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px",
        "2xl": "24px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
    },
  },
  plugins: [gluestackPlugin],
};