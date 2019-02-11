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
    delete apiService.defaults.headers.common["Authorization"];
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
  // TOPIC
  [types.UPDATE_TOPIC_LIST]: ({commit}) => {
    return apiService.get('/topics/list')
    .then(resp => {
      commit('UPDATE_TOPIC_LIST', resp.data);
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.CHOOSE_TOPIC]: ({commit}, payload) => {
    let id = payload.replace('topic/', '')
    return apiService.get(`/topics/select/${id}`)
    .then(() => {
      commit('CHOOSE_TOPIC', id);
    })
    .catch(err => {
      throw(err);
    });

  },
  // UPDATE
  [types.UPDATE_PAGE_STATE]: ({commit}, payload) => {
    commit('TRANSITIONS_UPDATE', payload.pageTransitionStates);
    commit('PAGE_COMPONENTS_UPDATE', payload.pageComponents);
  },
  [types.REQUEST_PAGE_CURRENT]: ({commit}) => {
    return apiService.get('/pages/current')
    .then(resp => {
      commit('TRANSITIONS_UPDATE', resp.data.pageTransitionStates);
      commit('TOPIC_STATE_UPDATE', resp.data.topicState);
      commit('PAGE_COMPONENTS_UPDATE', resp.data.pageComponents);
      commit('PAGE_UPDATE', resp.data.page);
      commit('MAIL_NOTIFICATION_UPDATE', resp.data.mailNotifications);
    })
    .catch(err => {
      throw(err);
    })
  },
  [types.REQUEST_PAGE_TRANSITION]: ({commit}, id) => {
    return apiService.post('pageTransitions/doPageTransition/' + id + '?chosenByPlayer=true')
    .then(resp => {
      commit('TRANSITIONS_UPDATE', resp.data.pageTransitionStates);
      commit('TOPIC_STATE_UPDATE', resp.data.topicState);
      commit('PAGE_COMPONENTS_UPDATE', resp.data.pageComponents);
      commit('PAGE_UPDATE', resp.data.page);
      commit('MAIL_NOTIFICATION_UPDATE', resp.data.mailNotifications);
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.DIALOG_UPDATE]: (context, payload) => {
    context.commit(types.DIALOG_UPDATE, payload);
  },
  // NOTEBOOK
  [types.UPDATE_NOTEBOOK]: ({commit}, payload) => {
    return apiService.get('notebook/list')
    .then(resp => {
      commit(types.UPDATE_NOTEBOOK, resp.data);
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.ADD_PERSONAL_NOTE]: ({commit}, payload) => {
    return apiService.post(`notebook/${payload.id}/personalNote?markdownContent=${payload.text}`)
    .then(resp => {
      commit(types.ADD_PERSONAL_NOTE, resp.data);
    })
    .catch(err => {
      throw(err);
    });
  },
  // MAIL
  [types.MAIL_LIST_UPDATE]: ({commit}) => {
    return apiService.get('mail/list')
    .then(resp => {
      commit(types.MAIL_LIST_UPDATE, resp.data);
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.HANDLE_NEW_MAIL]: ({commit}, payload) => {
    commit(types.HANDLE_NEW_MAIL, payload);
  },
  [types.SET_NEW_MAIL_AS_READ]: ({commit}, payload) => {
    return apiService.put(`mail/sync/${payload.id}`)
    .then(() => {
      commit(types.SET_NEW_MAIL_AS_READ, payload);
    })
    .catch(err => {
      throw(err);
    });
  },
});