const path = require('path');

const config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/, //Check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ 
            [ "env", { "targets": { "chrome": 60 } } ],
          ]
        }
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&minetype=application/font-woff" 
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    modules: [
      "lib",
      "node_modules",
      path.resolve(__dirname, "src"),
    ],
  },

  devtool: "eval-source-map", // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";
}

module.exports = config;