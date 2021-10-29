/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "lambda/src/*.ts"
  ],
  testPathIgnorePatterns: ["/node_modules/","/lambda/dist/"]
};