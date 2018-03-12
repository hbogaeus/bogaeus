const path = require("path");

const publicPath = "http://localhost:3000/";

module.exports = {
  mode: "development",
  entry: "./index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "priv", "static", "dist"),
    publicPath
  },

  context: path.resolve(__dirname),

  serve: {
    port: 3000,
    clipboard: false,
    stdin: true,
    dev: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  },

  devServer: {
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },

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
