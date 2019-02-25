<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  // name of the component
  name: 'inputField',
  components: { SvgIcon },
  props: ['typeProp', 'labelName', 'required', 'disabled', 'value', 'iconName' ],
  data() {
    return {
      focused: false,
      filledInput: false,
    };
  },
  computed: {
    computedType: function () {
      if( this.$props.typeProp === '' || this.$props.typeProp === undefined ){
        return 'text';
      }
      return this.$props.typeProp;
    },
  },
  mounted: function() {
    this.checkInputState();
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