var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var glob = require('glob');
// 获取所有模块列表
const moduleToBuild = require('./module-conf').getModuleToBuild() || []
// 组装多个（有几个module就有几个htmlWebpackPlugin）htmlWebpackPlugin，然后追加到配置中
const htmlWebpackPlugins = []
// 判断一下是否为分开打包模式
if (process.env.MODE_ENV === 'separate') {
  // 分开打包时是通过重复运行指定模块打包命令实现的，所以每次都是单个html文件，只要配置一个htmlPlugin
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    filename: process.env.NODE_ENV === 'testing'
      ? 'index.html'
      : config.build.index,
    // template: 'index.html',
    template: config.build.htmlTemplate,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }))
} else {
  // 一起打包时是通过多入口实现的，所以要配置多个htmlPlugin
  for (let module of moduleToBuild) {
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      filename: `${module}.html`,
      template: `./src/modules/${module}/index.html`,
      inject: true,
      // 这里要指定把哪些chunks追加到html中，默认会把所有入口的chunks追加到html中，这样是不行的
      chunks: ['vendor', 'manifest', module],
      // filename: process.env.NODE_ENV === 'testing'
      //   ? 'index.html'
      //   : config.build.index,
      // template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }))
  }
}
// var env = config.build.env
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // drop_console: true,
        // warnings: false,
        warnings: false,
        drop_debugger: true,
        drop_console: false
      },
      sourceMap: true,
      // sourceMap: false

    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      { from: 'config/user.env.js', to: '../env/user.env.js' }
    ])
  ].concat(htmlWebpackPlugins)
})


// ....判断一下是否为分开打包模式
// if (process.env.MODE_ENV === 'separate') {
//   // 分开打包时是通过重复运行指定模块打包命令实现的，所以每次都是单个html文件，只要配置一个htmlPlugin
//   webpackConfig.plugins.push(new HtmlWebpackPlugin({
//     filename: process.env.NODE_ENV === 'testing'
//       ? 'index.html'
//       : config.build.index,
//     // template: 'index.html',
//     template: config.build.htmlTemplate,
//     inject: true,
//     favicon: path.resolve('favicon.ico'),
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true
//       // more options:
//       // https://github.com/kangax/html-minifier#options-quick-reference
//     },
//     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
//     chunksSortMode: 'dependency'
//   }))
// } else {
//   // 一起打包时是通过多入口实现的，所以要配置多个htmlPlugin
//   const moduleLi = require('./module-conf').moduleLi || []
//   let pages = ((globalPath)=>{
//   let htmlFiles = {},
//     pageName;

//   globalPath.forEach((pagePath)=>{
//     var basename = path.basename(pagePath, path.extname(pagePath));
//     pageName = basename;
//     htmlFiles[pageName] = {};
//     htmlFiles[pageName]['chunk'] = basename;
//     htmlFiles[pageName]['path'] = pagePath;

//   });
//     return htmlFiles;
//   })(moduleLi);

// for (let entryName in pages) {
//   let conf = {
//     // 生成出来的html文件名
//     filename: entryName + '.html',
//     // filename: config.build.index,
//     // 每个html的模版，这里多个页面使用同一个模版
//     // template: pages[entryName]['path'],
//     template: config.build.htmlTemplate,
//     // 自动将引用插入html
//     inject: true,
//     favicon: path.resolve('favicon.ico'),
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true
//       // more options:
//       // https://github.com/kangax/html-minifier#options-quick-reference
//     },
//     chunks: ['vendor','manifest',pages[entryName]['chunk']],
//     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
//     chunksSortMode: 'dependency'
//   };
//   console.log(conf, config.build.index, 'confconfconf')
//   /*入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应）*/
//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
//   }
// }


if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}



module.exports = webpackConfig;
