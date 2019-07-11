<template src="./template.html"></template>

<script>

export default {
  name: 'inputField',
  props: ['typeProp', 'labelName', 'required', 'disabled', 'value', 'inputName', 'autocomplete' ],
  data() {
    return {
      focused: false,
      filledInput: false,
      uid: this.randomNumber(1, 1000),
    };
  },
  computed: {
    computedType: function () {
      if( this.$props.typeProp === '' || this.$props.typeProp === undefined ){
        return 'text';
      }
      return this.$props.typeProp;
    },
    randomRefName: function() {
      return `inputField-${this.uid}`;
    }
  },
  mounted: function() {
    this.checkInputState();
    document.body.click();
  },
  methods: {
    randomNumber: function(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    checkInputState: function() {
      if( this.$refs[`inputField-${this.uid}`].value == '' ) {
        this.focused = false;
        this.filledInput = false;
      }else{
        this.focused = true;
        this.filledInput = true;
      }
    },
    updateEmitVal() {
      this.$emit('input', this.$refs[`inputField-${this.uid}`].value);
    },
    inputFocus: function() {
      this.$refs[`inputField-${this.uid}`].focus();
    },
    setFocus(foc) {
      this.checkInputState();
      if( this.$refs[`inputField-${this.uid}`].value != '' ) {
        return;
      }
      this.wasInFocus = true;
      if (foc) {
        this.focused = true;
      } else {
        this.focused = false;
      }
    },
  },
};
</script>