// Mutations

import * as types from './types';

export default({
  // ERRORS
  [types.ERROR_NETWORK_CONNECTION] (state, payload) {
    state.errors = {
      status: payload.status,
      message: payload.message,
    };
  },
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
  [types.UPDATE_TOKEN] (state, payload ) {
    state.status.token = payload.token;
    state.status.refreshToken = payload.refreshToken;
  },
  // LAYOUT MUTATIONS
  [types.LAYOUT_OPEN] (state, payload) {
    switch(payload) {
      case 'notebook':
        state.layout.notebook.opened = true;
        state.layout.notebook.disabled = false;
        state.layout.mail.opened = false;
        state.layout.mail.disabled = false;
        state.layout.dialog.opened = false;
        break;
      case 'mail':
        state.layout.notebook.opened = false;
        state.layout.notebook.disabled = false;
        state.layout.mail.opened = true;
        state.layout.mail.disabled = false;
        state.layout.dialog.opened = false;
        break;
      case 'dialog':
        state.layout.notebook.opened = false;
        state.layout.notebook.disabled = true;
        state.layout.mail.opened = false; 
        state.layout.mail.disabled = true;
        state.layout.dialog.opened = true;
        break;
      default:
        state.layout.notebook.opened = false;
        state.layout.notebook.disabled = false;
        state.layout.mail.opened = false;
        state.layout.mail.disabled = false;
        state.layout.dialog.opened = false;
    }
  },
  [types.LAYOUT_CLOSE] (state, payload) {
    switch(payload) {
      case 'notebook':
        state.layout.notebook.opened = false;
        break;
      case 'mail':
        state.layout.mail.opened = false;
        break;
      case 'dialog':
        state.layout.dialog.opened = false;
        state.layout.notebook.disabled = false;
        state.layout.mail.disabled = false;
        break;
      default:
        state.layout.notebook.opened = false;
        state.layout.notebook.disabled = false;
        state.layout.mail.opened = false;
        state.layout.mail.disabled = false;
        state.layout.dialog.opened = false;
    }
  },
  [types.TOGGLE_SIDEBAR_VISIBILITY] (state, payload) {
    state.layout.statusbarVisible = payload;
  },
  // EXERCISE
  [types.SAVE_TEXT_FOR_EXERCISE] (state, payload) {
    state.exerciseText = payload;
  },
  [types.CLEAR_TEXT_FOR_EXERCISE] (state) {
    state.exerciseText = '';
  },
  // INVITATION LINK MUTATIONS
  [types.SET_INVITATION_LINK] (state, payload) {
    state.invitationLink = payload;
  },
  [types.CLEAR_INVITATION_LINK] (state) {
    state.invitationLink = '';
  },
  [types.INVITATION_EXPIRED] (state, payload) {
    state.invitationExpired = payload;
  },
  // GAMES MUTATIONS
  [types.UPDATE_GAMES] (state, payload) {
    state.games = payload;
  },
  // CLASSES MUTATIONS
  [types.UPDATE_CLASSES] (state, payload) {
    state.classes = payload;
  },
  [types.UPDATE_CLASSROOM_STUDENTS] (state, payload) {
    state.students = payload;
  },
  // SUPERVISION MUTATIONS
  [types.UPDATE_SUPERVISION] (state, payload) {
    state.supervision.selected = payload;
  },
  // TOPIC MUTATIONS
  [types.UPDATE_TOPIC_LIST] (state, payload) {
    state.topic.list = payload;
  },
  [types.CHOOSE_TOPIC] (state, payload) {
    state.topic.selected = true;
    state.topic.id = payload;
  },
  // UPDATE PAGE / STORYLINE MUTATIONS
  [types.PAGE_UPDATE] (state, payload) {
    state.page = payload;
  },
  [types.TRANSITIONS_UPDATE] (state, payload) {
    state.pageTransitionStates = payload;
  },
  [types.GAME_STATE_UPDATE] (state, payload) {
    state.gameState = payload;
  },
  [types.PAGE_COMPONENTS_UPDATE] (state, payload) {
    state.pageComponents = payload;
  },
  [types.UPDATE_TIMER] (state, payload) {
    state.pageTimer = payload;
  },
  // DIALOG MUTATIONS
  [types.DIALOG_UPDATE] (state, payload) {
    state.dialogNotifications = payload;
  },
  [types.DIALOG_UPDATE_EXISTING] (state, payload) {
    state.dialogNotifications = state.dialogNotifications.map( dialog => {
      if( dialog.id == payload.filterID ){
        return { ...dialog, answers: payload.answers, speech: payload.speech}
      }else{
        return dialog;
      }
    });
  },
  // NOTEBOOK MUTATIONS
  [types.UPDATE_NOTEBOOK] (state, payload) {
    state.notebook.list = payload;
  },
  [types.UPDATE_PERSONAL_NOTES] (state, payload) {
    let condition = state.personalNotes.findIndex( s => s.id == payload.id );
    
    if( condition == -1 ){
      // Add personal note
      state.personalNotes.push(payload);
    }else if( condition > -1 ){
      // Update existing personal note
      state.personalNotes = state.personalNotes.map(note => {
        if( note.id == payload.id ){
          note.text = payload.text;
        }
        return note;
      });
    }
    
  },
  [types.CLEAR_PERSONAL_NOTES] (state) {
    state.personalNotes = [];
    state.clearNoteEditor = true;
    setTimeout(()=>{
      state.clearNoteEditor = false;
    }, 1000);
  },
  [types.CLEAR_EDITOR] (state) {
    state.clearNoteEditor = false;
  },
  // MAIL MUTATIONS
  [types.UPDATE_SELECTED_MAIL] (state, payload) {
    // Update from mailList
    state.selectedMail = payload;
  },
  [types.MAIL_LIST_UPDATE] (state, payload) {
    // Update from mailList
    state.mails = payload;
  },
  [types.MAIL_NOTIFICATION_UPDATE] (state, payload) {
    state.mailNotifications = payload;
  },
  [types.SAVE_MAIL_REPLY] (state, payload) {
    state.mails = state.mails.map( item => {
      if( item.mail.id == payload.id ){
        item.mailReplyList = { text: payload.text };
      }
      return item;
    });
  },
});
