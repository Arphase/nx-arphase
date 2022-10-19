const google = {
  maps: {
    Animation: { BOUNCE: '' },
    OverlayView: function () {},
    Marker: function () {},
    InfoWindow: function () {},
    LatLng: function (lat: any, lng: any) {
      return [lat, lng];
    },
    Map: function (obj: any) {},
    MapTypeId: { ROADMAP: true },
    places: {
      AutocompleteService: function () {},
      PlacesService: function (obj: any) {
        return {
          PlacesServiceStatus: {
            OK: true,
          },
          textSearch: function (query: any) {
            return [];
          },
          nearbySearch: function (query: any) {
            return [];
          },
        };
      },
    },
  },
};

module.exports = {
  displayName: 'valmira-ui-place-detail',
  preset: '../../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
    google: google,
  },
  coverageDirectory: '../../../../coverage/libs/valmira/ui/place-detail',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  testRunner: 'jasmine2',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
