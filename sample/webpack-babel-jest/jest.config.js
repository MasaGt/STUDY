module.exports = {
    moduleNameMapper: {
        "@src/(.+)$": "<rootDir>/src/js/$1",
        // "\.(css|scss)$": "identity-obj-proxy",
        "\.(css|scss)$": "<rootDir>/src/stab/fileMock.js",
        // "@img/(.+)$": "<rootDir>/src/images/$1"
        "@img/(.+)$": "<rootDir>/src/stab/fileMock.js"
    }
}