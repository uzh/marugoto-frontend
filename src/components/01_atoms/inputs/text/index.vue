<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */

export default {
  // name of the component
  name: 'inputField',
  props: ['typeProp', 'labelName', 'required', 'value'],
  data() {
    return {
      wasInFocus: false,
      focused: false,
      filledInput: false,
      error: false,
    };
  },
  mounted: function() {
    this.checkInputState();
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
    checkInputState: function() {
      if( this.$refs.inputField.value == '' ) {
        this.focused = false;
        this.filledInput = false;
      }else{
        this.focused = true;
        this.filledInput = true;
      }

      if( this.wasInFocus && !this.focused && !this.filledInput ){
        this.error = true;
      }else{
        this.error = false;
      }
    },
    updateEmitVal() {
      this.$emit('input', this.$refs.inputField.value);
    },
    inputFocus: function() {
      this.$refs.inputField.focus();
    },
    setFocus(foc) {
      this.checkInputState();
      if( this.$refs.inputField.value != '' ) {
        return;
      }
      this.wasInFocus = true;
      if (foc) {
        this.focused = true;
      } else {
        this.focused = false;
      }
    },
  }
};
</script>