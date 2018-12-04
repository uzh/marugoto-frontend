/* eslint no-unused-vars: 0 */

// Mutations

import * as types from './types';

export default({
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
