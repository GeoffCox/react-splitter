const { join, resolve } = require("path");
var webpack = require('webpack');

// package.json contains the version number of the dependencies
// that we want to make external.  Parsing the package.json
// makes it automatic to keep the package version in sync with
// the CDN URL used in the HtmlWebpackPlugin
const packageJson = require(join(__dirname, 'package.json'));

// This is the object webpack looks at for configuration.
// Webpack doesn't  care about any other javascript in the file.
// Because this is javascript, you can write functions to help build up the configuration.
module.exports = {

  // Tells webpack what kind of source maps to produce.
  // There are a lot of options, but I chose the standalone file option.
  devtool: "source-map",

  // Tells webpack where start walking the dependencies to build a bundle.
  entry: {
    app: [
      join(__dirname, "src/index.tsx")
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache standard libraries like React once.
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    }
  },

  // When the env is "development", this tells webpack to provide debuggable information in the source maps and turns off some optimizations.
  mode: process.env.NODE_ENV,

  // Tells webpack how to run file transformation pipeline of webpack.
  // Awesome-typescript-loader will run on all typescript files.
  // Source-map-loader will run on the JS files.
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loaders: ["awesome-typescript-loader"] },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js?$/, loader: "source-map-loader" },

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
  },

  // Tells webpack not to touch __dirname and __filename.
  // If you run the bundle in node.js it falls back to these values of node.js.
  // https://github.com/webpack/webpack/issues/2010
  node: {
    __dirname: false,
    __filename: false
  },

  // Tells webpack where to output the bundled javascript
  output: {
    filename: "index.js",
    library: 'ReactSplitter',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: join(__dirname, "build")
  },

  // Tells the HTML webpack plug-in to use a template and emit dist/index.html
  plugins: [
  ],

  // Tells webpack what file extesions it should look at.
  resolve: {
    alias: {
      'react': resolve(__dirname, './node_modules/react') ,
      'react-dom': resolve(__dirname, './node_modules/react-dom'),
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
};