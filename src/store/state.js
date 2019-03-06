// State

export default ({
  errors: false,
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
  notebook: {
    list: [],
  },
  topicState: {},
  dialogNotifications: [],
  pageTransitionStates: [],
  pageComponents: [],
  page: {},
});