/*
 * @Author: chenrc2
 * @Date: 2018-01-30 19:52:04
 */

(() => {
  // 处理在IE9下origin不存在的问题
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }
})();
