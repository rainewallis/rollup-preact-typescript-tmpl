/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.module\.css$": "<rootDir>/lib/jest/identity-object-proxy.js",
    },
    "setupFilesAfterEnv": [
        "<rootDir>/lib/jest/setup-tests.js",
    ],
}