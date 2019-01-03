/* */

// Getters

export default{
  get_layoutState: state => {
    return {
      'notebook': state.layout.notebook,
      'mail': state.layout.mail,
      'dialog': state.layout.dialog,
    };
  },
  get_status: state => {
    return state.status;
  },
};
