module.exports = {
  displayName: 'innovatech-ui-groups-innovatech-ui-groups-ui',
  preset: '../../../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../../../../coverage/libs/innovatech/ui/groups/ui',
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
