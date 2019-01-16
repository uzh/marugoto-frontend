<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */

export default {
  name: 'radioField',
  props: ['item', 'name', 'value'],
  methods: {
    emitChange(value){
      this.$emit('emitRadioChange', value);
    },
  },
};
</script>