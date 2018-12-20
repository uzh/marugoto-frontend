<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */

export default {
  // name of the component
  name: 'selectField',
  props: [ 'list', 'genderLabel' ],
  data() {
    return {
      selectedValue: 'Gender',
      listOpened: false,
    };
  },
  created () {
    document.addEventListener('click', this.blur)
  },
  methods: {
    optionSelection: function(value) {
      this.selectedValue = value;
      this.$emit('selectChange', value);
    },
    openList: function() {
      if (this.listOpened) {
        this.listOpened = false;
      } else {
        this.listOpened = true;
      }
    },
    blur(e) {
      let el = this.$refs.selectBox;
      let target = e.target;
      if (( el !== target) && !el.contains(target)) {
        this.listOpened = false;
      }
    }
  }
};
</script>