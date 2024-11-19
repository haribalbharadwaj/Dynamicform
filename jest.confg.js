module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/jest/**/*.test.tsx'], 
  moduleNameMapper: {
    '\\.(css|less)$': "<rootDir>/__mocks__/styleMock.js" // Optional for handling CSS imports
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': 'jest-transform-css',
  },
};
