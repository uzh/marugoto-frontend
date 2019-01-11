<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  // name of the component
  name: 'selectField',
  components: { svgIcon },
  props: [ 'list', 'genderLabel', 'required', 'iconName' ],
  data() {
    return {
      value: true,
      selectedValue: 'Gender',
      listOpened: false,
      error: false,
      focused: false,
    };
  },
  created () {
    document.addEventListener('click', this.blur);
    this.setFocus();
  },
  beforeDestroy () {
    document.removeEventListener('click')
  },
  methods: {
    optionSelection: function(item) {
      this.selectedValue = item.name;
      this.$emit('selectChange', item.value);
    },
    openList: function() {
      if (this.listOpened) {
        this.listOpened = false;
      } else {
        this.listOpened = true;
        this.value = false;
      }
    },
    blur(e) {
      let el = this.$refs.selectBox;
      let target = e.target;
      if (( el !== target) && !el.contains(target)) {
        this.listOpened = false;
      }
    },
    setFocus(foc) {
      if (foc) {
        this.focused = true;
      } else {
        this.focused = false;
      }
    },
    verifyField() {
      if ( this.selectedValue == 'Gender' && this.value == false ) {
        this.error = true;
      } else {
        this.error = false;
        if (this.selectedValue != 'Gender') {
          this.focused = true;
        }
      }
    }
  }
};
</script>