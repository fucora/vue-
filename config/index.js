// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
const MODULE = process.env.MODULE_ENV || 'undefined'
// 入口模板路径
const htmlTemplate =  `./src/modules/${MODULE}/index.html`
// const htmlTemplate =  path.resolve(__dirname, `../src/modules/${MODULE}/index.html`)
module.exports = {
  build: {
    env: require('./prod.env'),
    // index: path.resolve(__dirname, '../dist/index.html'),
    index: path.resolve(__dirname, '../dist', MODULE, 'index.html'),
    // 这里判断一下打包的模式，如果是分开打包，要把成果物放到以模块命名的文件夹中
    assetsRoot: process.env.MODE_ENV === 'separate' ? path.resolve(__dirname, '../dist', MODULE) : path.resolve(__dirname, '../dist'),
    // assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    assetsPublicPath: '',
    productionSourceMap: false,
    // 加入html入口
    htmlTemplate: htmlTemplate,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9528,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/ucenterWeb/v1/iotserver': {
      //   target: 'http://developer-sit.msmartlife.com',
      //   logLevel: 'debug',
      //   changeOrigin: true
      // },
      '/abroadWeb/v1/iotserver': {
        // http://172.31.19.206:30000/abroadWeb/v1/iotserver/test/doTest
        target: 'http://developer-us.msmartlife.com',
        logLevel: 'debug',
        changeOrigin: true,
        secure: false,
      }
      // '/mj': {
      //   target: 'http://iotdeveloper-sit.smartmidea.net',
      //   logLevel: 'debug',
      //   changeOrigin: true
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
