<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */

export default {
  // name of the component
  name: 'inputField',
  props: ['typeProp', 'labelName', 'iconPosition', 'disabled', 'required'],
  data() {
    return {
      val: '',
      focused: false,
      verified: false,
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
    updateEmitVal() {
      this.$emit('input', this.val);
    },
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
    verifyField() {
      if ( this.val == '' ) {
        this.error = true;
        this.verified = false;
      } else {
        this.error = false;
        this.verified = true;        
      }
    }
  }
};
</script>