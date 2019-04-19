var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var glob = require('glob')

// add hot-reload related code to entry chunks 热更新
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 这是现在代码
const moduleList = require('./module-conf').moduleList || []
// 组装多个（有几个module就有几个htmlWebpackPlugin）htmlWebpackPlugin，然后追加到配置中
const htmlWebpackPlugins = []
for (let module of moduleList) {
  let option = {
    filename: `${module}/index.html`,
    template: `./src/modules/${module}/index.html`,
    inject: true,
    favicon: path.resolve('favicon.ico')
  }
  option.chunks = [];
  option.chunks.push(`${module}`);
  htmlWebpackPlugins.push(new HtmlWebpackPlugin(option))
}
console.log(htmlWebpackPlugins, moduleList, 'htmlWebpackPlugins')

let devConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([{ from: 'config/user.env.js', to: 'env/user.env.js' }])
  ].concat(htmlWebpackPlugins)
})


// 以下是之前的代码

// const moduleLi = require('./module-conf').moduleLi || []
// console.log(moduleLi, 'moduleLi')
// let pages = ((globalPath)=>{
//   let htmlFiles = {},
//     pageName;
//   glob.sync(globalPath).forEach((pagePath)=>{
//     var basename = path.basename(pagePath, path.extname(pagePath));
//     pageName = basename;
//     htmlFiles[pageName] = {};
//     htmlFiles[pageName]['chunk'] = basename;
//     htmlFiles[pageName]['path'] = pagePath;
//   // utils.resolve('src')+'/modules/**/*.html'
//   });
//   // globalPath.forEach((pagePath)=>{
//   //   var basename = path.basename(pagePath, path.extname(pagePath));
//   //   pageName = basename;
//   //   htmlFiles[pageName] = {};
//   //   htmlFiles[pageName]['chunk'] = basename;
//   //   htmlFiles[pageName]['path'] = pagePath;

//   // });
//   return htmlFiles;
// })(moduleLi);
// console.log(pages, 'pages')

// for (let entryName in pages) {
//   let conf = {
//     // 生成出来的html文件名
//     filename: entryName + '.html',
//     // 每个html的模版，这里多个页面使用同一个模版
//     template: pages[entryName]['path'],
//     // 自动将引用插入html
//     inject: true,
//     favicon: path.resolve('favicon.ico'),
//     // 每个html引用的js模块，也可以在这里加上vendor等公用模块
//     chunks: ['vendor','manifest',pages[entryName]['chunk']]
//   };
//   /*入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应）*/
//   devConfig.plugins.push(new HtmlWebpackPlugin(conf));
//   console.log(new HtmlWebpackPlugin(conf), 'new HtmlWebpackPlugin(conf)')
// }

module.exports = devConfig;
