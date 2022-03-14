const google = {
  maps: {
    Animation: { BOUNCE: '' },
    OverlayView: function () { },
    Marker: function () { },
    InfoWindow: function () { },
    LatLng: function (lat, lng) {
      return [lat, lng];
    },
    Map: function (obj) { },
    MapTypeId: { ROADMAP: true },
    places: {
      AutocompleteService: function () { },
      PlacesService: function (obj) {
        return {
          PlacesServiceStatus: {
            OK: true,
          },
          textSearch: function (query) {
            return [];
          },
          nearbySearch: function (query) {
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
    'google': google
  },
  coverageDirectory: '../../../../coverage/libs/valmira/ui/place-detail',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  testRunner: 'jasmine2',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
