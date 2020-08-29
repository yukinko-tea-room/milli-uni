/* eslint-disable no-undef */
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "ignorePatterns": ["**/node_modules/", "**/test/", "**/build/", "**/docs/", "serviceWorker.js"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "version": "detect",
        }
    },
    "rules": {
        "react/prop-types": 0,
        "semi": 2,
    }
};