var webpack = require('webpack');

// use resolve() to normalize paths between unix/windows environments
var path = require('path');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {

    mode: 'production',

    entry: {
        player: './app.js',

        // code splitting: we take all of our vendor code and put it in a separate bundle (vendor.min.js)
        // this way it will have better caching/cache hits since it changes infrequently
        /*
        vendor: [
            // local packages
            //'clipboard',
            //'jquerynotify'

            // npm packages are added to vendor code separately in splitChunks config below
        ]*/
    },

    output: {
        filename: '_build/bundle.js'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /^(?!.*\.{test,min}\.js$).*\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    /*
    resolve: {
        modules: [
            resolve('app'),
            resolve('app/css'),
            'node_modules'
        ],

        alias: {
            // external libraries
            jquerynotify: resolve('app/js/jquery.notify.min'),
            clipboard: resolve('app/js/clipboard.min'),

            // directory alias to shorten template paths
            templates: resolve('app/templates')
        }
    },*/

    plugins: [
        // ensure that we get a production build of any dependencies
        // this is primarily for React, where this removes 179KB from the bundle
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]

};

/*
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './app.js'
  },
  output: {
    filename: '_build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-native-modules']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ]
}; */