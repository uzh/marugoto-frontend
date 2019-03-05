<template src="./template.html"></template>

<script>
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
