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
  props: ['typeProp', 'idName', 'labelName'],
  data() {
    return {
      val: '',
      focused: false,
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
      if (foc || this.val) {
        this.focused = true;
      } else {
        this.focused = false;
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