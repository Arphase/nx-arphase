module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./apps/valmira/app/src/**/*.html', './libs/valmira/ui/**/*.html']
  },
  darkMode: 'class',
  theme: {
    textColor: { primary: '#1d2b15' },
    extend: {},
  },
  variants: {
    extend: {},
  },
};
