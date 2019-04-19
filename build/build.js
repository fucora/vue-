require('./check-versions')()

process.env.NODE_ENV = 'production'
// MODULE_ENV用来记录当前打包的模块名称
process.env.MODULE_ENV = process.argv[2]
// MODE_ENV用来记录当前打包的模式，total代表整体打包（静态资源在同一个目录下，可以复用重复的文件），separate代表分开打包（静态资源按模块名称分别独立打包，不能复用重复的文件）
process.env.MODE_ENV = process.argv[3]
// 如果有传参时，对传入的参数进行检测，如果参数非法，那么停止打包操作
const checkModule = require('./module-conf').checkModule
if (process.env.MODULE_ENV === 'undefined' && !checkModule()) {
  return
}
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('构建中...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  构建完成.\n'))
    console.log(
      `
      -----------------------------------------------------------
        提示：
          1.访问需要在根web的根目录添加env目录，内容为config下的user.env.js
          2.打包完成后需挂载web服务器才能访问
          3.接口全部都需要代理
      `
    );
  })
})
