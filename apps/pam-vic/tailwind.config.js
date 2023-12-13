export default {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./apps/pam-vic/src/**/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      'primary': '#272727'
    },
    screens: {
      '2xl': { 'max': '2000px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '768px' },
      'sm': { 'max': '639px' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
