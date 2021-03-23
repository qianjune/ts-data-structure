module.exports = {
  roots: ["<rootDir>/ioc"],
  transform: {
    "^.+\\.(t|j)s?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
