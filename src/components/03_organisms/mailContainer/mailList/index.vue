<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'MailList',
  components: { VueMarkdown },
  props: ['list', 'selectedIndex', 'newMails'],
  data() {
    return {
      falseHtml :false,
    };
  },
}
</script>
