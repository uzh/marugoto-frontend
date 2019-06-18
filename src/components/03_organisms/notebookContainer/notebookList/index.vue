<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'NotebookList',
  components: { VueMarkdown },
  props: [ 'list', 'selected' ],
  data(){
    return{
      
    }
  },
}
</script>
