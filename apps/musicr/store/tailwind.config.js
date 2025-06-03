export default {
  prefix: '',
  content: ['./apps/musicr/store/src/**/*.html', './libs/musicr/ui/**/*.html'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#f0f0f0'
        }
      },
      lineHeight: {
        0: '0'
      }
    },
  },
};
