module.exports = {
  purge: {
    enabled: true,
    content: ['./apps/pam-vic/src/**/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': { 'max': '2000px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '768px' },
      'sm': { 'max': '639px' },
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
