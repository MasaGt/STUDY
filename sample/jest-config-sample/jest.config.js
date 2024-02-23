const path = require("path");

module.exports = {
  collectCoverage: true,
  coverageDirectory: path.resolve(__dirname, "test_result"),
  // coverageProvider: "v8",
};