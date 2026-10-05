/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TRUFORM Brand Palette
        teal: {
          50:  '#EEF5F8',  // Soft Blue Background
          100: '#D3E0E8',  // Very Light Blue
          200: '#B8CDD9',  // Light Blue Muted
          300: '#83A7BF',  // Light Blue
          400: '#5C8BA8',  // Medium Blue
          500: '#3C7183',  // Secondary Teal
          600: '#2D5E6F',  // Mid Teal
          700: '#205364',  // Primary Deep Teal
          800: '#183A46',  // Dark Text / Deep
          900: '#0F2730',  // Darkest
        },
        // Neutral / White
        white: '#FFFFFF',
        ink: {
          100: '#F4F8FA',
          200: '#E8F0F5',
          300: '#C5D8E4',
          400: '#8AAFC4',
          500: '#5A8CA8',
          600: '#3A6E87',
          700: '#1D4D62',
          800: '#183A46',
          900: '#0D2530',
        },
        // Keep some neutral for text
        stone: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
        // Sky accent for highlights
        sky: {
          50:  '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Cairo', 'sans-serif'],
        latin: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft':    '0 4px 20px -2px rgba(32, 83, 100, 0.08)',
        'soft-md': '0 6px 24px -4px rgba(32, 83, 100, 0.12)',
        'soft-lg': '0 12px 36px -6px rgba(32, 83, 100, 0.14)',
        'soft-xl': '0 20px 50px -10px rgba(32, 83, 100, 0.18)',
        'teal':    '0 4px 16px -2px rgba(32, 83, 100, 0.30)',
        'teal-lg': '0 8px 28px -4px rgba(32, 83, 100, 0.40)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(135deg, #205364 0%, #3C7183 100%)',
        'blue-gradient': 'linear-gradient(135deg, #EEF5F8 0%, #D3E0E8 100%)',
      },
    },
  },
  plugins: [],
}
