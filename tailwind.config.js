/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9EF',
        butter: '#FFE66D',
        candy: '#FF91C8',
        mint: '#A8E477',
        sky: '#BDEBFA',
        espresso: '#30271F',
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(48,39,31,0.18)',
        lift: '0 22px 45px -18px rgba(48,39,31,0.28)',
        pill: '0 8px 24px -10px rgba(48,39,31,0.25)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--r, 0deg))' },
        },
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(30px,-24px) scale(1.06)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          from: { opacity: '0', transform: 'translateY(20px) scale(0.85)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        rise: 'rise .8s cubic-bezier(.2,.8,.2,1) both',
        pop: 'pop .8s cubic-bezier(.2,.9,.3,1.2) both',
      },
    },
  },
  plugins: [],
}
