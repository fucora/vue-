import Cookies from 'js-cookie';

// const TokenKey = 'accessToken';

export function getToken(TokenKey = 'accessToken') {
  return Cookies.get(TokenKey);
}

export function setToken(TokenKey = 'accessToken', token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken(TokenKey = 'accessToken') {
  return Cookies.remove(TokenKey);
}

// export default {
//   getToken({ TokenKey = 'accessToken' }) {
//     console.log(TokenKey);
//     debugger;
//     return Cookies.get(TokenKey);
//   },
//   setToken({ TokenKey = 'accessToken' }, token) {
//     return Cookies.set(TokenKey, token);
//   },
//   removeToken({ TokenKey = 'accessToken' }) {
//     return Cookies.remove(TokenKey);
//   }
// };

// export ({TokenKey = 'accessToken'})=> {
//   getToken() {
//     return Cookies.get(TokenKey);
//   }
// }
