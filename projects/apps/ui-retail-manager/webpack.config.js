/* eslint-disable comma-dangle */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const BabiliPlugin = require('babili-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development' && process.env.NODE_ENV_TARGET === 'development';
const STAGING = process.env.NODE_ENV === 'production' && process.env.NODE_ENV_TARGET === 'staging';
const PRODUCTION = process.env.NODE_ENV === 'production' && process.env.NODE_ENV_TARGET === 'production';

const entryProd = {
  index: ['babel-polyfill', './src/index.js'],
};

const entryDev = {
  index: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8282',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
};

const entry = PRODUCTION || STAGING
  ? entryProd
  : entryDev;

const plugins = PRODUCTION || STAGING
  ? [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new LodashModuleReplacementPlugin({
      collections: true, // TODO: Serkan revisit this after updating dependencies
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  ]
  : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ];

plugins.push(
  new webpack.DefinePlugin({
    APP_ID: JSON.stringify('retailer'),
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION),
    STAGING: JSON.stringify(STAGING),
    CROSS_STORAGE_URL: PRODUCTION
      ? JSON.stringify('https://api.sloops.today/cross-storage.html')
      : STAGING
        ? JSON.stringify('https://api.sloops.waat.eu/cross-storage.html')
        : JSON.stringify('http://localhost:8080/cross-storage.html'),
    API_URL: PRODUCTION
      ? JSON.stringify('https://api.sloops.today/graphql')
      : STAGING
        ? JSON.stringify('https://api.sloops.waat.eu/graphql')
        : JSON.stringify('http://localhost:8080/graphql'),
  })
);

plugins.push(
  new ExtractTextPlugin({
    filename: 'app-[contenthash].css',
  })
);

plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
  })
);

plugins.push(
  new FaviconsWebpackPlugin({
    logo: path.join(__dirname, 'favicon.png'),
    background: '#0e95d9',
    title: 'Sloops Retail Manager',
  })
);

if (PRODUCTION || STAGING) {
  plugins.push(
    new BabiliPlugin()
  );
}

const modulePaths = {
  '@sloops/library-ui-components': fs.realpathSync(path.resolve(__dirname, 'node_modules/@sloops/library-ui-components/src')),
  '@sloops/library-ui-data-wrappers': fs.realpathSync(path.resolve(__dirname, 'node_modules/@sloops/library-ui-data-wrappers/src')),
  '@sloops/library-utils': fs.realpathSync(path.resolve(__dirname, 'node_modules/@sloops/library-utils/src')),
};

module.exports = {
  devtool: PRODUCTION || STAGING ? 'nosources-source-map' : 'cheap-module-eval-source-map',
  entry,
  plugins,
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      '@sloops/library-ui-components': modulePaths['@sloops/library-ui-components'],
      '@sloops/library-ui-data-wrappers': modulePaths['@sloops/library-ui-data-wrappers'],
      '@sloops/library-utils': modulePaths['@sloops/library-utils'],
    },
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(js)$/,
        loaders: ['babel-loader'],
        exclude: '/node_modules/',
        include: [
          path.join(__dirname, 'src'),
          modulePaths['@sloops/library-ui-components'],
          modulePaths['@sloops/library-ui-data-wrappers'],
          modulePaths['@sloops/library-utils'],
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loaders: ['url-loader?limit=10000&name=images/[name]-[hash:12].[ext]'],
        exclude: '/node_modules/',
        include: [path.join(__dirname, 'src'), modulePaths['@sloops/library-ui-components']],
      },
      /*
        TODO: (serkan) ask julian why we need this?
        also, this is not the correct way, this should merge with the scss test
       */
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: !!(PRODUCTION || STAGING),
              },
            },
          ],
        })
      },
      {
        test: /\.(scss|sass)$/,
        exclude: '/node_modules/',
        include: [path.join(__dirname, 'src'), modulePaths['@sloops/library-ui-components']],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: !!(PRODUCTION || STAGING),
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => ([
                  autoprefixer({
                    browsers: [
                      'last 3 versions',
                      'safari >= 7',
                    ]
                  }),
                  precss(),
                ]),
              },
            },
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app-[hash].js',
  },
};
