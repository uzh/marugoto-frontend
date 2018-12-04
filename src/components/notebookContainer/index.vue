<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotebookContainer',
  data(){
    return{
      title: 'Notebook',
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
}
</script>
