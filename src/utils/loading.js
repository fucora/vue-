import { Loading } from 'element-ui';
let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '',
    background: 'transparent',
    // background: '#000',
    spinner: '',
    target: document.querySelector('#app>.demo-wrapper'),
    customClass: 'iot-loading'
  });
}

function endLoading() {
  loading.close();
}
let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
