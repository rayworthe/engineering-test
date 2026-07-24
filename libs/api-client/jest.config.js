/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {
      jsc: {
        target: 'es2022',
        parser: { syntax: 'typescript' },
      },
    }],
  },
};
