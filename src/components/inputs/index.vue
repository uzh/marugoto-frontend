<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Icon from '../icons';

export default {
  // name of the component
  name: 'inputField',
  components: { Icon },
  props: ['typeProp', 'idName', 'labelName', 'iconPosition'],
  data() {
    return {
      val: '',
      focused: false,
      filled: false,
      error: false,
    };
  },
  created: function() {
      this.setFocus();
  },
  computed: {
    computedType: function () {
      if( this.$props.typeProp === '' || this.$props.typeProp === undefined ){
        return 'text';
      }
      return this.$props.typeProp;
    },
  },
  methods: {
    inputFocus: function() {
      this.$refs.inputField.focus();
    },
    setFocus(foc) {
      if (foc) {
        this.focused = true;
      } else {
        this.focused = false;
      }
    },
    isFilled() {
      if (this.val) {
        this.filled = true;
      } else {
        this.filled = false;
      }
    },
    hasError() {
      if (this.val === '') {
        this.error = true;
      } else {
        this.error = false;
      }
    }
  }
};
</script>