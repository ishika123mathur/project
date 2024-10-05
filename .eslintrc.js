// eslint-disable-next-line no-undef
module.exports = {
    env: {
      browser: true, 
      es2021: true,  
    },
    extends: "eslint:recommended", 
    parserOptions: {
      ecmaVersion: 12, 
    },
    rules: {
      "no-unused-vars": "warn", 
      "no-console": "off",
      "indent": ["error", 2], 
      "quotes": ["error", "double"], 
      "semi": ["error", "always"],
    },
  };
  