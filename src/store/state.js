// State

export default ({
  errors: {
    status: false,
    message: '',
  },
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
  selectedMail: undefined,
  notebook: {
    list: [],
  },
  newPersonalNote: {
    status: false,
  },
  topicState: {},
  dialogNotifications: [],
  pageTransitionStates: [],
  pageComponents: [],
  page: {},
});