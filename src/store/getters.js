/* */

// Getters

export default{
  get_layoutState: state => {
    return {
      'notebook': state.layout.notebook,
      'mail': state.layout.mail,
    };
  },
  get_status: state => {
    return state.status;
  },
};
