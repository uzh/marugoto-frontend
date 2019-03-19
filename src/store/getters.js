// Getters

export default{
  get_errors: state => {
    return state.errors;
  },
  get_layoutState: state => {
    return state.layout;
  },
  get_status: state => {
    return state.status;
  },
  get_page: state => {
    return state.page;
  },
  get_topicState: state => {
    return state.topicState;
  },
  get_transitions: state => {
    return state.pageTransitionStates;
  },
  get_PageComponents: state => {
    return state.pageComponents;
  },
  get_textExerciseExists: state => {
    let result = {exist: false};
    for( var ii = 0; ii < state.pageComponents.length; ii++){
      if( state.pageComponents[ii].type == 'TextExercise' ){
        result = {
          exist: true,
          ...state.pageComponents[ii]
        };
      }
    }
    return result;
  },
  get_dialog: state => {
    return state.dialogNotifications;
  },
  get_notebook: state => {
    return state.notebook;
  },
  get_personalNoteStatus: state => {
    return state.newPersonalNote.status;
  },
  get_topic: state => {
    return state.topic;
  },
  get_mails: state => {
    return state.mails;
  },
  get_newMails: state => {
    return state.mailNotifications;
  },
  get_selectedMailIndex: state => {
    return state.selectedMail;
  },
  get_mailNotificationState: state => {
    var notificationNumber = 0;
    for( var ii = 0; ii < state.mails.length; ii++){
      if( !state.mails[ii].read ){
        notificationNumber++;
      }
    }
    return notificationNumber;
  },
};
