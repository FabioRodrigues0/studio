module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\.(t|j)sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react)/)',
  ],
};