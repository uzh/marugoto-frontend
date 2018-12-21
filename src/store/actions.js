/* eslint no-unused-vars: 0 */

// Actions

import * as types from './types'
import apiService from '../apiService'

export default({
  [types.REGISTER]: ({commit}, userInfo) => {
    return new Promise((resolve, reject) => {
      apiService({url: '/user/registration', data: userInfo, method: 'POST' })
      .then(() => {
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
      apiService({url: '/auth/generate-token', data: userInfo, method: 'POST' })
      .then(resp => {
        const token = resp.data.token;
        const refreshToken = resp.data.refreshToken;
        apiService.defaults.headers.common['Authorization'] = token;
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
  [types.UPDATE_TOKEN]: (context, payload) => {
    context.commit(types.UPDATE_TOKEN, payload);
  },
  [types.LAYOUT_OPEN]: (context, payload) => {
    context.commit(types.LAYOUT_OPEN, payload);
  },
  [types.LAYOUT_CLOSE]: (context, payload) => {
    context.commit(types.LAYOUT_CLOSE, payload);
  },
});