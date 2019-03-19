var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // routerAuthority: true,
  // urlNoAuthority:"['/websiteinfo/contactus', '/websiteinfo/privatepolicy','/websiteinfo/serviceterm']", // 不需要登录就可以访问的页面
})
