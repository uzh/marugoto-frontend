// State

export default ({
  errors: {
    status: false,
    message: '',
  },
  status: {
    isLoged: false,
    role: '',
    token: '',
    refreshToken: '',
  },
  layout: {
    statusbarVisible: false,
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
  games: {},
  classes: {},
  supervision: {
    selected: false,
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
  gameState: {},
  dialogNotifications: [],
  pageTransitionStates: [],
  pageComponents: [],
  page: {},
});