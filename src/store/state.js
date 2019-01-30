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
  mails: [
    {
      "numberOfColumns": 6,
      "renderOrder": 2,
      "subject": "mail subject",
      "mailBody": "This is mailBody",
      "from": {
        "id": "character/944",
        "salutation": "Mr",
        "firstName": "Grinch",
        "lastName": "Lazy",
        "mail": "monster@mail.dev"
      },
      "type": "MailExercise"
    },
    {
      "numberOfColumns": 6,
      "renderOrder": 2,
      "subject": "Novi mail",
      "mailBody": "Kakav lud body ono skroz",
      "from": {
        "id": "character/944",
        "salutation": "Mrs",
        "firstName": "Drug",
        "lastName": "Grga",
        "mail": "grga@mail.com"
      },
      "type": "MailExercise"
    }
  ],
  notebook: [],
  pageTransitionStates: [],
  pageComponents: [],
  page: {},
});