<template src="./template.html"></template>

<script>
import Btn from '@/components/01_atoms/buttons';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'TopicComponent',
  components: { Btn, VueMarkdown },
  props: [ 'list' ],
  created: function() {
    setTimeout(function(){
      console.log('Expired token')
    },60000);
  },
}
</script>
