const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "./public/"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader?name=[path][name].[ext]?[hash]",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)(\?[a-z0-9]+)?$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=8192",
      },
    ],
  },
};
