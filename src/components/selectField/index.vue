<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */

export default {
  // name of the component
  name: 'selectField',
  props: [ 'list' ],
  data() {
    return {
      selectedValue: 'Gender',
      listOpened: false,
    };
  },
  methods: {
    optionSelection: function(value){
      this.selectedValue = value;
      this.$emit('selectChange', value);
    },
    toggleList: function() {
      if (this.listOpened) {
        this.listOpened = false;
      } else {
        this.listOpened = true;
      }
    }
  }
};
</script>