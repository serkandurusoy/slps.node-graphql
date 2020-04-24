const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        include: path.join(__dirname, '../src/'),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loaders: ['url-loader'],
        exclude: '/node_modules/',
      },
      {
        test: /\.(sass|scss)$/,
        loaders: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
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
          "sass-loader",
        ],
        include: path.resolve(__dirname, '../')
      }
    ],
  },
};
