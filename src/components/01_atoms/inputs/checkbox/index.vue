<template src="./template.html"></template>
<script>
export default {
  name: 'checkboxField',
  props: ['item', 'name', 'value'],
  methods: {
    emitChange(value){
      this.$emit('emitCheckboxChange', value);
    },
  },
};
</script>