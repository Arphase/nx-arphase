module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class',
  theme: {
    textColor: {
      'primary': '#1d2b15'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
};
