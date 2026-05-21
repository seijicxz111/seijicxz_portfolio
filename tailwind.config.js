/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Chiikawa Palette
        deep:    '#355872',
        mid:     '#7AAACE',
        sky:     '#9CD5FF',
        cream:   '#F7F8F0',
        // extras
        petal:   '#F9C5D1',
        blossom: '#FFD6E0',
        leaf:    '#C8EFD4',
        sun:     '#FFF0C2',
      },
      fontFamily: {
        display: ['"Daruma Drop One"', 'cursive'],
        body:    ['"Daruma Drop One"', 'cursive'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'float-fast':  'float 4s ease-in-out infinite',
        'spin-slow':   'spin 20s linear infinite',
        'pulse-soft':  'pulse-soft 3s ease-in-out infinite',
        'wag':         'wag 1.5s ease-in-out infinite',
        'blink':       'blink 1s step-end infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-18px) rotate(3deg)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.05)' },
        },
        wag: {
          '0%,100%': { transform: 'rotate(-8deg)' },
          '50%':     { transform: 'rotate(8deg)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition:  '600px 0' },
        },
        'bounce-soft': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'chiikawa': '0 8px 32px rgba(53,88,114,0.15), 0 2px 8px rgba(53,88,114,0.08)',
        'chiikawa-lg': '0 20px 60px rgba(53,88,114,0.2), 0 4px 16px rgba(53,88,114,0.1)',
        'sky': '0 4px 24px rgba(156,213,255,0.5)',
        'glow': '0 0 20px rgba(122,170,206,0.4)',
      },
      backgroundImage: {
        'chiikawa-gradient': 'linear-gradient(135deg, #355872 0%, #7AAACE 50%, #9CD5FF 100%)',
        'cream-gradient':    'linear-gradient(135deg, #F7F8F0 0%, #e8f4ff 100%)',
        'dot-pattern':       'radial-gradient(circle, #9CD5FF 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '24px 24px',
        'dot-md': '32px 32px',
      },
    },
  },
  plugins: [],
};
