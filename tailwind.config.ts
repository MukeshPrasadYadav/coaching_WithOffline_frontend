// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class', // Important for dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c8',
          700: '#0369a1',
        },
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        slate: {
          50: '#f8fafc',
          900: '#0f172a',
        }
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgb(0 0 0 / 0.08)',
        'medium': '0 4px 12px -4px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
};

export default config;