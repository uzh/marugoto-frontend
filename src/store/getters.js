/* */

// Getters

export default{
  get_layoutState: state => {
    return state.layout;
  },
  get_status: state => {
    return state.status;
  },
  get_transitions: state => {
    return state.pageTransitionStates;
  },
  get_PageComponents: state => {
    return state.pageComponents;
  },
};
