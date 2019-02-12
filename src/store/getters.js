/* */

// Getters

export default{
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
  get_dialog: state => {
    return state.dialogNotifications;
  },
  get_notebook: state => {
    return state.notebook;
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
  get_mailNotificationState: state => {
    return state.mailNotificationState;
  },
};
