/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        'bg-elevated': 'var(--color-bg-elevated)',
        fg: 'var(--color-fg)',
        'fg-muted': 'var(--color-fg-muted)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-2': 'var(--color-accent-2)',
        'brand-pink': 'var(--color-pink)',
        'brand-green': 'var(--color-green)',
        'brand-cyan': 'var(--color-cyan)',
        'brand-orange': 'var(--color-orange)',
        'brand-red': 'var(--color-red)',
        'brand-yellow': 'var(--color-yellow)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
