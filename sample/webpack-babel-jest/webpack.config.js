const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        include: path.resolve(__dirname, "src/js"),
      },
      {
        use: ["style-loader", "css-loader"],
        test: /.css$/,
        include: path.resolve(__dirname, "src/css"),
      },
      {
        test: /.(png|jpeg|gif|svg|jpg)$/,
        type: "inline",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@css": path.resolve(__dirname, "src/css"),
      "@img": path.resolve(__dirname, "src/images"),
    },
  },
};
