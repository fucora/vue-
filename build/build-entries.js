const path = require('path');
const fs = require('fs');
const utils = require('./utils');

// let buildEntries = {};

// /*获取所有模块的文件夹名*/
// const modules = fs.readdirSync(path.join(utils.resolve('src'),'modules'));

// for (let moduleName of modules) {
//   buildEntries[moduleName] = path.join(utils.resolve('src'),'modules',moduleName,'main.js');
// }
// 初始化入口配置
const entry = {}
// 所有模块的列表
const moduleToBuild = require('./module-conf').getModuleToBuild() || []
// 根据传入的待打包目录名称，构建多入口配置
for (let module of moduleToBuild) {
  entry[module] = `./src/modules/${module}/main.js`
}

console.log(entry);
module.exports = entry;
