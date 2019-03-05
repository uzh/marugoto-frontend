<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown';
import Btn from '@/components/01_atoms/buttons';

export default {
  name: 'dialogComponent',
  components: { Btn, VueMarkdown },
  props: ['text', 'source', 'options'],
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    emitOption: function(dialogId) {
      this.$store.dispatch('LAYOUT_CLOSE', 'dialog');
      this.$emit('emitDialog', dialogId);
    },
  },
};
</script>
