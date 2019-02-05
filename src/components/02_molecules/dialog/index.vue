<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Btn from '@/components/01_atoms/buttons';

export default {
  // name of the component
  name: 'dialogComponent',
  components: { Btn },
  props: ['text', 'source', 'options'],
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    emitOption: function(dialogId) {
      this.$emit('emitDialog', dialogId);
    },
  },
};
</script>