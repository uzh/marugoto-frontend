<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'MailList',
  components: { VueMarkdown },
  props: ['list', 'selectedIndex' ],
  data() {
    return {
      falseHtml: false,
      selectedMail: undefined,
    };
  },
  methods: {
    emitMailListClick: function(index, id) {
      this.$emit('selectedMail', {index, id});
    },
    selectMail: function(val) {
      this.selectedMail = val;
    }
  },
}
</script>
