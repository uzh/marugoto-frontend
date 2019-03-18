<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown';
import Btn from '@/components/01_atoms/buttons';

export default {
  name: 'dialogComponent',
  components: { Btn, VueMarkdown },
  props: ['text', 'source', 'options', 'dialogID' ],
  data() {
    return {
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      opened: false,
    };
  },
  methods: {
    emitOption: function(answerID, dialogID) {
      this.$emit('emitDialog', answerID, dialogID);
    },
  },
};
</script>
