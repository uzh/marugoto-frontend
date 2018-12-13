/* eslint no-unused-vars: 0 */

// Mutations

import * as types from './types';

export default({
  // AUTH MUTATIONS
  [types.AUTH_SUCCESS] (state, payload) {
    state.status.isLoged = true;
    state.status.role = 'player';
    state.status.token = payload.token;
    state.status.refreshToken = payload.refreshToken;
  },
  [types.AUTH_ERROR] (state ) {
    state.status.isLoged = false;
    state.status.role = '';
    state.status.token = '';
    state.status.refreshToken = '';
  },
  [types.LOGOUT] (state ) {
    state.status.isLoged = false;
    state.status.role = '';
    state.status.token = '';
    state.status.refreshToken = '';
  },
  // LAYOUT MUTATIONS
  [types.LAYOUT_OPEN] (state, payload) {
    switch(payload) {
      case 'notebook':
        state.layout.notebook = true;
        state.layout.mail = false;
        break;
      case 'mail':
        state.layout.notebook = false;
        state.layout.mail = true;
        break;
      default:
        state.layout.notebook = false;
        state.layout.mail = false;
    }
  },
  [types.LAYOUT_CLOSE] (state, payload) {
    switch(payload) {
      case 'notebook':
        state.layout.notebook = false;
        break;
      case 'mail':
        state.layout.mail = false;
        break;
      default:
        state.layout.notebook = false;
        state.layout.mail = false;
    }
  },
});
