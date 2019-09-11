/* eslint no-unused-vars: 0 */

// Actions

import * as types from './types'
import apiService from '../apiService'
import router from '../router'

export default({
  [types.REGISTER]: ({commit}, userInfo) => {
    return apiService({url: '/user/registration', data: userInfo, method: 'POST', })
      .then(() => {
        return {
          mail: userInfo.mail,
          password: userInfo.password,
        };
      })
      .catch(err => {
        commit('AUTH_ERROR');
        throw(err);
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
        throw(err);
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
  // LAYOUT
  [types.LAYOUT_OPEN]: (context, payload) => {
    context.commit(types.LAYOUT_OPEN, payload);
  },
  [types.LAYOUT_CLOSE]: (context, payload) => {
    context.commit(types.LAYOUT_CLOSE, payload);
  },
  [types.TOGGLE_SIDEBAR_VISIBILITY]: (context, payload) => {
    context.commit(types.TOGGLE_SIDEBAR_VISIBILITY, payload);
  },
  // ERRORS
  [types.ERROR_NETWORK_CONNECTION]: (context, payload) => {
    context.commit(types.ERROR_NETWORK_CONNECTION, payload);
  },
  // EXERCISE
  [types.SUBMIT_EXERCISE_STATE]: ({commit}, payload) => {
    return apiService.put(`states/${payload.id}`, {
      inputState: payload.answer,
    })
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.SAVE_TEXT_FOR_EXERCISE]: ({commit}, payload) => {
    commit(types.SAVE_TEXT_FOR_EXERCISE, payload);
  },
  [types.CLEAR_TEXT_FOR_EXERCISE]: ({commit}) => {
    commit(types.CLEAR_TEXT_FOR_EXERCISE);
  },
  // GAMES
  [types.UPDATE_GAMES]: ({commit}) => {
    return apiService.get('/game/list')
    .then(resp => {
      commit('UPDATE_GAMES', resp.data);
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.CONTINUE_GAME]: ({commit, dispatch}, payload) => {
    return apiService.put(`/game/continue/${payload}`)
    .then(resp => {
      dispatch('UPDATE_PAGE_STATE', resp.data);
      commit('CHOOSE_TOPIC', resp.data.gameState.topic.id.replace('topic/', ''));
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  // INVITATION LINK
  [types.SET_INVITATION_LINK]: ({commit}, payload) => {
    commit('SET_INVITATION_LINK', payload);
  },
  [types.CLEAR_INVITATION_LINK]: ({commit}) => {
    commit('CLEAR_INVITATION_LINK');
  },
  [types.INVITATION_EXPIRED]: ({commit}, payload) => {
    commit('INVITATION_EXPIRED', payload);
  },
  // CLASSES
  [types.UPDATE_CLASSES]: ({commit}) => {
    return apiService.get('/classroom/list')
    .then(resp => {
      commit('UPDATE_CLASSES', resp.data);
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.ADD_NEW_CLASS]: ({commit}, userInfo) => {
    return apiService({url: '/classroom/new', data: userInfo, method: 'POST', })
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.EDIT_CLASS]: ({commit, dispatch}, payload) => {
    return apiService({url: `/classroom/${payload.id}`, data: payload.data, method: 'PUT', })
    .then(resp => {
      // Call update classes here
      dispatch('UPDATE_CLASSES');
      return resp.data;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.REQUEST_CLASSROOM_DATA]: ({commit}, payload) => {
    return apiService.get(`/classroom/${payload}`)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.REQUEST_CLASSROOM_MEMBERS]: ({commit, dispatch}, payload) => {
    return apiService.get(`/classroom/${payload}/members`)
    .then(resp => {
      dispatch('UPDATE_CLASSROOM_STUDENTS', resp.data);
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.UPDATE_CLASSROOM_STUDENTS]: (context, payload) => {
    context.commit(types.UPDATE_CLASSROOM_STUDENTS, payload);
  },
  // DOWNLOAD FILES
  [types.REQUEST_DOWNLOAD_FILES]: ({commit}, payload) => {
    return apiService.get(`/classroom/${payload}/files`)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw(err);
    });
  },
  // SUPERVISION
  [types.UPDATE_SUPERVISION]: (context, payload) => {
    context.commit(types.UPDATE_SUPERVISION, payload);
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
  [types.CHOOSE_TOPIC]: ({commit, state}, payload) => {
    // If going to storyline from games just update vuex -> else condition
    let id = payload.id.replace('topic/', '');
    let url = '';
    if( state.invitationLink.length > 0 ){
      url = `/topics/select/${id}?invitationLinkId=${state.invitationLink}`;
    }else{
      url = `/topics/select/${id}`;
    }

    return apiService.get(url)
      .then(() => {
        commit('CLEAR_INVITATION_LINK');
        commit('CHOOSE_TOPIC', id);
      })
      .catch(err => {
        throw(err);
      });
  },
  // UPDATE
  [types.UPDATE_PAGE_STATE]: ({commit, dispatch}, payload) => {
    commit('TRANSITIONS_UPDATE', payload.pageTransitionStates);
    commit('GAME_STATE_UPDATE', payload.gameState);
    commit('PAGE_COMPONENTS_UPDATE', payload.pageComponents);
    commit('PAGE_UPDATE', payload.page);
    commit('DIALOG_UPDATE', payload.dialogNotifications);
    commit('MAIL_NOTIFICATION_UPDATE', payload.mailNotifications);
    dispatch('UPDATE_NOTEBOOK');
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
  [types.REQUEST_PAGE_TRANSITION]: ({commit, dispatch}, payload) => {
    return apiService.post(`pageTransitions/doPageTransition/${payload.id}?chosenByPlayer=${payload.userTransition}`)
    .then(resp => {
      dispatch('LAYOUT_CLOSE').then(() => {
        dispatch('UPDATE_PAGE_STATE', resp.data);
      });
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.UPDATE_TIMER]: ({commit}, payload) => {
    commit('UPDATE_TIMER', payload);
  },
  // DIALOG
  [types.DIALOG_UPDATE]: (context, payload) => {
    context.commit(types.DIALOG_UPDATE, payload);
  },
  [types.DIALOG_UPDATE_EXISTING]: (context, payload) => {
    context.commit(types.DIALOG_UPDATE_EXISTING, payload);
  },
  [types.DIALOG_ANSWER]: ({dispatch}, payload) => {
    return apiService.get(`dialog/${payload.answerID}`)
    .then(resp => {
      if( resp.data.stateChanged ){
        dispatch('LAYOUT_CLOSE', 'dialog').then(() => {
          dispatch('REQUEST_PAGE_CURRENT');
        });
      }else if( resp.data.hasOwnProperty('answers') && resp.data.hasOwnProperty('speech')){
        dispatch('DIALOG_UPDATE_EXISTING', {
          filterID: payload.dialogID,
          answers: resp.data.answers,
          speech: resp.data.speech,
        });
      }
      else{
        dispatch('LAYOUT_CLOSE', 'dialog');
      }
    })
    .catch(err => {
      throw(err);
    });
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
  [types.ADD_PERSONAL_NOTE]: ({commit}, payload) => {
    return apiService.post(`notebook/${payload.id}/personalNote`, {
      markdownContent: payload.text,
    })
    .then(() => {
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.UPDATE_PERSONAL_NOTES]: ({commit}, payload) => {
    commit(types.UPDATE_PERSONAL_NOTES, payload);
  },
  [types.CLEAR_PERSONAL_NOTES]: ({commit}) => {
    commit(types.CLEAR_PERSONAL_NOTES);
    setTimeout(()=>{
      commit(types.CLEAR_EDITOR);
    }, 1000);
  },
  // MAIL
  [types.UPDATE_SELECTED_MAIL]: (context, payload) => {
    context.commit(types.UPDATE_SELECTED_MAIL, payload);
  },
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
    .then(resp => {
      if( resp.data.stateChanged ){
        dispatch('REQUEST_PAGE_CURRENT')
        .then( () => {
          dispatch('MAIL_LIST_UPDATE');
        });
      }else{
        dispatch('MAIL_LIST_UPDATE');
      }
    })
    .catch(err => {
      throw(err);
    });
  },
  [types.SAVE_MAIL_REPLY]: ({commit, dispatch}, payload) => {
    return apiService.put(`mail/reply/${payload.id}`, {
      replyText: payload.text,
    })
    .then(resp => {
      commit(types.SAVE_MAIL_REPLY, payload);
      if( resp.data.stateChanged ){
        dispatch('REQUEST_PAGE_CURRENT')
        .then( () => {
          dispatch('MAIL_LIST_UPDATE');
        });
      }else{
        dispatch('MAIL_LIST_UPDATE');
      }
    })
    .catch(err => {
      throw(err);
    });
  },
  // UPLOAD
  [types.UPLOAD_FILE_EXERCISE]: ({commit}, payload) => {
    var loaderBar = document.getElementById('loader-bar');
    loaderBar.style.opacity = 0.3;

    return apiService({
        url: `/uploads?exerciseStateId=${payload.id}`, 
        data: payload.data, method: 'POST',
        onUploadProgress: function (progressEvent) {
          // Do whatever you want with the native progress event
          let pc = parseInt(100 - ( progressEvent.loaded / progressEvent.total * 100));
          loaderBar.style.right = pc + "%";
          
          if( progressEvent.total == progressEvent.loaded){
            setTimeout(()=>{
              loaderBar.style.opacity = 1;
            }, 100)

            setTimeout(()=>{
              loaderBar.innerText = 'DONE';
            }, 400)

            // setTimeout(()=>{
            //   loaderBar.style.right = "100%";
            //   loaderBar.style.opacity = 0;
            // }, 3000);

            // setTimeout(()=>{
            //   loaderBar.innerText = '';
            // }, 3300);
          }
        },
      })
      .then(resp => {
        
      })
      .catch(err => {
        if( err ){
          loaderBar.style.opacity = 1;
          loaderBar.style.right = "0%";
          loaderBar.innerText = 'There has been error!!!';

          setTimeout(()=>{
            loaderBar.style.right = "100%";
            loaderBar.style.opacity = 0;
          }, 3000);

          setTimeout(()=>{
            loaderBar.innerText = '';
          }, 3300);
        }
      })
  },
});