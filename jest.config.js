/**
 * Created by glenn on 13.08.19.
 */

const esModules = ['@ngrx', 'angular2-ui-switch', 'ng-dynamic', 'lodash-es'].join('|');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/testing/setup-jest.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ['jest-preset-angular/InlineHtmlStripStylesTransformer']
    }
  },
  transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
    '^.+\\.js$': '<rootDir>/src/testing/babel-jest-wrapper.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/out-tsc/',
    '<rootDir>/node_modules/'
  ],
  moduleNameMapper: {
    '@angular/common/locales/(.*).js': '<rootDir>/src/testing/__mocks__/file-mock.js'
  }
};
