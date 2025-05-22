// 0 = off
// 1 = warn
// 2 = throw error

module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "browser": true,
        "node": false
    },
    "plugins": [
        "react"
    ],
    "extends": ["eslint:recommended", "plugin:react/recommended", "standard"],
    "rules": {
        "semi": [1, "never"],
        "quotes": [1, "single"],
        "comma-dangle": [2, {
            "arrays": "ignore",
            "objects": "ignore",
            "imports": "ignore",
            "exports": "ignore",
            "functions": "ignore",
        }],
        "no-unused-vars": [1, {
            "args": "none"
        }],
        "padded-blocks": [1, "never"],
        "react/display-name": 0,
        "react/prop-types": 0,
        "no-multiple-empty-lines": 1,
        "spaced-comment": 0,
        "space-before-function-paren": 0,
        "space-infix-ops": 1,
        "no-console": 1,
        //"indent": 1,

    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "16.3.2"
        }
    }

};