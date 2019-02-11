<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'ImageComponent',
  components: { VueMarkdown },
  props: [ 'source', 'text' ],
}
</script>
