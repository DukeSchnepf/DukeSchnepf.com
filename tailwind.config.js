/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cinematic Warmth Palette (Derived from Profile Picture)
        'space-void': '#080505', // Deep warm black
        'space-light': '#1a1412', // Dark warm brown-grey
        'space-accent': '#2e2520', // Medium warm brown-grey

        // Refined Accent Colors - Cinematic Teal & Orange look
        'neon-blue': '#38bdf8', // Vibrant Sky Blue (Contrast)
        'neon-purple': '#d98e45', // Amber/Gold (Primary Light)
        'neon-pink': '#b54d28', // Copper/Rust
        'neon-cyan': '#e6c89c', // Pale Warm Light
        'accent-gold': '#ffb347', // Bright Amber

        // Semantic
        'text-primary': '#F5F5F7',
        'text-secondary': '#A8B2C0',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Press Start 2P"', 'Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 240, 255, 0.8)' },
        },
        'shooting-star': {
          '0%': { transform: 'translateX(0) translateY(0) rotate(315deg)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateX(-300px) translateY(300px) rotate(315deg)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shooting-star': 'shooting-star 3s linear infinite',
      },
    },
  },
  plugins: [],
}



