/* */

// Getters

export default{
  get_layoutState: state => {
    return {
      'notebook': state.layout.notebook,
      'mail': state.layout.mail,
    };
  },
  get_loggedStatus: state => {
    return state.user.logged;
  },
};
