var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var buildEntries = require('./build-entries')
var HappyPack = require('happypack');

console.log(
  `
  正在非常拼命地打包中...
  `
);

module.exports = {
  entry: buildEntries,
  output: {
    path: config.build.assetsRoot, // 编译后文件的存放目录
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve('src'),
      'common': utils.resolve('src/common'),
      'components': utils.resolve('src/components'),
      'api': utils.resolve('src/api'),
      'utils': utils.resolve('utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        use: 'happypack/loader?id=vue',
        include: [utils.resolve('src')]
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        include: [utils.resolve('src')]
      },
      {
        test: /\.(less|css)$/,
        use: 'happypack/loader?id=styles',
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [utils.resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|lua)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [utils.resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'styles',
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }),
    new HappyPack({
      id: 'vue',
      loaders: [
        {
          loader: 'vue-loader',
          options: vueLoaderConfig
        }
      ]
    })
  ]
};
