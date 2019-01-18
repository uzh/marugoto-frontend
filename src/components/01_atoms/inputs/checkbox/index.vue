<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */

export default {
  // name of the component
  name: 'checkboxField',
  props: ['item', 'name', 'value'],
  methods: {
    emitChange(value){
      this.$emit('emitCheckboxChange', value);
    },
  },
};
</script>