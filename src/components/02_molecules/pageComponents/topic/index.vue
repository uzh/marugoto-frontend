<template src="./template.html"></template>

<script>
import Btn from '@/components/01_atoms/buttons';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'TopicComponent',
  components: { Btn, VueMarkdown },
  props: [ 'list' ],
  data() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
    }
  }
}
</script>
