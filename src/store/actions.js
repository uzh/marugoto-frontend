/* eslint no-unused-vars: 0 */

// Actions

import * as types from './types'
import apiService from '../apiService'
import router from '../router'

export default({
  [types.REGISTER]: ({commit}, userInfo) => {
    return apiService({url: '/user/registration', data: userInfo, method: 'POST' })
      .then(() => {
        return {
          mail: userInfo.mail,
          password: userInfo.password,
        };
      })
      .catch(err => {
        commit('AUTH_ERROR');
      })
  },
  [types.LOGIN]: ({commit}, userInfo) => {
    return apiService({url: '/auth/generate-token', data: userInfo, method: 'POST' })
      .then(resp => {
        const token = resp.data.token;
        const refreshToken = resp.data.refreshToken;
        apiService.defaults.headers.common['Authorization'] = token;
        commit('AUTH_SUCCESS', {
          token: token,
          refreshToken: refreshToken,
        });
      })
      .catch(err => {
        commit('AUTH_ERROR');
      })
  },
  [types.LOGOUT]: (context) => {
    delete apiService.defaults.headers.common["Authorization"];
    localStorage.removeItem('UHZ');
    context.commit(types.LOGOUT);
    router.push('/');
  },
  [types.FORGOT_PASSWORD]: ({commit}, info) => {
    return apiService({url: '/user/password-forget', data: info, method: 'POST' })
      .then(resp => {
        return resp;
      })
      .catch(err => {
        throw(err);
      })
  },
  [types.RESET_PASSWORD]: ({commit}, info) => {
    return apiService({url: '/user/password-reset', data: info, method: 'POST' })
      .then(resp => {
        return resp;
      })
      .catch(err => {
        throw(err);
      })
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
  // EXERCISE
  [types.SUBMIT_EXERCISE_STATE]: ({commit}, payload) => {
    return apiService.put(`states/${payload.id}?inputState=${payload.answer}`)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw(err);
    });
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
    commit('TOPIC_STATE_UPDATE', payload.topicState);
    commit('PAGE_COMPONENTS_UPDATE', payload.pageComponents);
    commit('PAGE_UPDATE', payload.page);
    commit('DIALOG_UPDATE', payload.dialogNotifications);
    commit('MAIL_NOTIFICATION_UPDATE', payload.mailNotifications);
  },
  [types.REQUEST_PAGE_CURRENT]: ({commit, dispatch}) => {
    return apiService.get('/pages/current')
    .then(resp => {
      dispatch('UPDATE_PAGE_STATE', resp.data);
    })
    .catch(err => {
      throw(err);
    })
  },
  [types.REQUEST_PAGE_TRANSITION]: ({commit, dispatch}, id) => {
    return apiService.post('pageTransitions/doPageTransition/' + id + '?chosenByPlayer=true')
    .then(resp => {
      dispatch('UPDATE_PAGE_STATE', resp.data);
    })
    .catch(err => {
      throw(err);
    });
  },
  // DIALOG
  [types.DIALOG_UPDATE]: (context, payload) => {
    context.commit(types.DIALOG_UPDATE, payload);
  },
  // NOTEBOOK
  [types.UPDATE_NOTEBOOK]: ({commit}) => {
    return apiService.get('notebook/list')
    .then(resp => {
      commit(types.UPDATE_NOTEBOOK, resp.data);
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.ADD_PERSONAL_NOTE]: ({dispatch}, payload) => {
    let id = payload.id;
    return apiService.post(`notebook/${id}/personalNote?markdownContent=${payload.text}`)
    .then(() => {
      dispatch('REQUEST_PERSONAL_NOTE', `notebookEntry/${id}`);
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.REQUEST_PERSONAL_NOTE]: ({commit}, payload) => {
    let path = payload.split('/')[1];
    return apiService.get(`notebook/${path}/personalNote/list`)
    .then(resp => {
      commit(types.UPDATE_PERSONAL_NOTE_LIST, {
        serverData: resp.data,
        id: payload,
      });
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
  [types.SYNC_MAIL]: ({dispatch}, payload) => {
    return apiService.put(`mail/sync/${payload.id}?isRead=${payload.read}`)
    .then(() => {
      dispatch('MAIL_LIST_UPDATE');
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.SAVE_MAIL_REPLY]: ({commit, dispatch}, payload) => {
    return apiService.put(`mail/reply/${payload.id}?replyText=${payload.text}`)
    .then(resp => {
      console.log(resp)
      if( resp.data.stateChanged ){
        dispatch('REQUEST_PAGE_CURRENT');
      }else{
        dispatch('MAIL_LIST_UPDATE');
      }
    })
    .then(() => {
      commit(types.SAVE_MAIL_REPLY, payload);
    })
    .catch(err => {
      throw(err);
    });
  },
});