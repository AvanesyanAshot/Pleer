module.exports = {
  printWidth: 80,
  tabWidth: 1,
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: "auto",
  overrides: [
    {
      files: '*.{js,jsx,tsx,ts,scss,css,json,html}',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
