/* eslint no-unused-vars: 0 */

// Actions

import * as types from './types';
import axios from 'axios'

const API_URL = process.env.VUE_APP_API_PATH || 'http://localhost:8080/api'
axios.defaults.baseURL = API_URL;

// Interceptor for refresh token = works on response
axios.interceptors.response.use(response => response, error => {
  console.log('Interceptor');
  
  const status = error.response ? error.response.status : null

  if (status === 401) {
    return refreshToken(store).then(_ => {
      error.config.headers['Authorization'] = 'Bearer ' + store.state.auth.token;
      error.config.baseURL = undefined;
      return customs.request(error.config);
    });
  }
  if (status === 400) {
    console.log(error.message);
    alert(error);
  }

  return Promise.reject(error);
});

export default({
  [types.REGISTER]: ({commit}, userInfo) => {
    return new Promise((resolve, reject) => {
      axios({url: '/user/registration', data: userInfo, method: 'POST' })
      .then(resp => {
        resolve({
          mail: userInfo.mail,
          password: userInfo.password,
        })
      })
      .catch(err => {
        commit('AUTH_ERROR');
        reject(err)
      })
    })
  },
  [types.LOGIN]: ({commit}, userInfo) => {
    return new Promise((resolve, reject) => {
      axios({url: '/auth/generate-token', data: userInfo, method: 'POST' })
      .then(resp => {
        const token = resp.data.token;
        const refreshToken = resp.data.refreshToken;
        axios.defaults.headers.common['Authorization'] = token;
        commit('AUTH_SUCCESS', {
          token: token,
          refreshToken: refreshToken,
        });
        resolve(resp);
      })
      .catch(err => {
        commit('AUTH_ERROR');
        reject(err);
      })
    })
  },
  [types.LOGOUT]: (context) => {
    context.commit(types.LOGOUT);
  },
  [types.LAYOUT_OPEN]: (context, payload) => {
    context.commit(types.LAYOUT_OPEN, payload);
  },
  [types.LAYOUT_CLOSE]: (context, payload) => {
    context.commit(types.LAYOUT_CLOSE, payload);
  },
  
});