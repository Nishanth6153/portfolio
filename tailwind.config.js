/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Orange editorial palette ──────────────────────────────
        orange: {
          primary:  '#FF9812',
          deep:     '#E8820A',
          bright:   '#FFB347',
          amber:    '#FFD700',
          glow:     'rgba(255,152,18,0.35)',
          '12':     'rgba(255,152,18,0.12)',
          '20':     'rgba(255,152,18,0.20)',
          '30':     'rgba(255,152,18,0.30)',
        },
        // ── Warm neutral palette ──────────────────────────────────
        warm: {
          white:    '#FAFAF7',
          'white-dim': '#E8E8E0',
          charcoal: '#1A1A1A',
          black:    '#0D0D0D',
          panel:    '#111111',
        },
        // ── Legacy dark palette kept for compatibility ────────────
        background: {
          DEFAULT: '#0D0D0D',
          subtle:  '#111111',
          surface: '#161616',
          elevated:'#1A1A1A',
          hover:   '#222222',
        },
        graphite: {
          50:  '#f4f4f5',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b',
          900: '#0f0f12',
          950: '#09090b',
        },
        accent: {
          DEFAULT: '#FF9812',
          light:   '#FFB347',
          muted:   '#B08040',
          tint:    'rgba(255,152,18,0.08)',
          glow:    'rgba(255,152,18,0.25)',
        },
      },

      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"DM Mono"', 'monospace'],
        display: ['"Armstrong"', '"Bebas Neue"', '"Plus Jakarta Sans"', 'sans-serif'],
        armstrong: ['"Armstrong"', 'sans-serif'],
      },

      fontSize: {
        'display-xl': ['clamp(5rem, 14vw, 11rem)', { lineHeight: '0.88', letterSpacing: '0.02em' }],
        'display-lg': ['clamp(3.5rem, 10vw, 8rem)',  { lineHeight: '0.90', letterSpacing: '0.02em' }],
        'display-md': ['clamp(2.5rem, 6vw, 5rem)',   { lineHeight: '0.92', letterSpacing: '0.02em' }],
      },

      letterSpacing: {
        tighter: '-0.04em',
        tight:   '-0.02em',
        normal:  '0',
        wide:    '0.04em',
        wider:   '0.08em',
        widest:  '0.18em',
        super:   '0.30em',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      boxShadow: {
        // Orange glow shadows
        'orange-sm':   '0 0 20px rgba(255,152,18,0.20), 0 4px 12px rgba(0,0,0,0.4)',
        'orange-md':   '0 0 40px rgba(255,152,18,0.28), 0 8px 24px rgba(0,0,0,0.5)',
        'orange-lg':   '0 0 80px rgba(255,152,18,0.35), 0 20px 60px rgba(0,0,0,0.6)',
        'orange-xl':   '0 0 120px rgba(255,152,18,0.40), 0 40px 80px rgba(0,0,0,0.7)',
        // Panel shadows
        'panel':       '0 30px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.40)',
        'panel-dark':  '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,152,18,0.10)',
        // Legacy
        'apple-card':  '0 0 0 1px rgba(255,152,18,0.08), 0 8px 32px -4px rgba(0,0,0,0.6)',
        'apple-hover': '0 0 0 1px rgba(255,152,18,0.18), 0 16px 48px -8px rgba(0,0,0,0.8)',
        'glow-sm':     '0 0 20px rgba(255,152,18,0.12)',
        'glow-md':     '0 0 40px rgba(255,152,18,0.20)',
      },

      backgroundImage: {
        'gradient-orange':      'linear-gradient(135deg, #FFB347 0%, #FF9812 50%, #E8820A 100%)',
        'gradient-orange-glow': 'radial-gradient(ellipse at center, rgba(255,152,18,0.30) 0%, transparent 70%)',
        'gradient-dark-panel':  'linear-gradient(145deg, #111111 0%, #1A1400 80%, #2A1900 100%)',
        'gradient-section':     'linear-gradient(180deg, #0D0D0D 0%, #111111 100%)',
      },

      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'marquee':      'marquee 28s linear infinite',
        'ping-slow':    'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-10px) rotate(0.5deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
