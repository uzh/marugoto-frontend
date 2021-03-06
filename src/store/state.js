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
  loadingBar: '',
  transitionsState: {
    mail: true,
    page: true,
  },
  invitationLink: '',
  invitationExpired: false,
  games: {},
  classes: {},
  students: {},
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
  personalNotes: [],
  clearNoteEditor: false,
  gameState: {},
  dialogNotifications: [],
  pageTransitionStates: [],
  pageComponents: [],
  page: {},
  pageTimer: 0,
});