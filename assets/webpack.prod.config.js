const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "priv", "static", "dist")
  },

  context: path.resolve(__dirname),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[path]__[local]___[hash:base64:5]"
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".css"]
  }
};
