var webpack = require("webpack");

if (!process.env.NODE_ENV ) {
  process.env.NODE_ENV = "development";
}

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}

module.exports = {
  devTool: 'eval',
  entry: [
    "./app/index.jsx",
    "./app/index.html",
    "./app/assets/stylesheets/app.scss",
  ],

  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: __dirname + "/public/",
  },

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /app\.scss$/,
        loader: "style!css!sass",
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.svg$/,
        loader: "file?name=images/[name].[ext]",
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(process.env.API_HOST),
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],
}
