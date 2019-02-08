/* */

// State

export default ({
  global: {
  
  },
  status: {
    isLoged: false,
    role: '',
    token: '',
    refreshToken: '',
  },
  layout: {
    notebook: {
      opened: false,
      disabled: false,
    },
    mail: {
      opened: false,
      disabled: false,
    },
    dialog: {
      opened: false,
    }
  },
  topic: {
    selected: false,
    id: undefined,
    list: [],
  },
  mailNotifications: [],
  mails: [],
  mailNotificationState : 0,
  notebook: {
    list: [],
    personalNotes: [],
  },
  topicState: {},
  pageTransitionStates: [],
  pageComponents: [],
  page: {},
});