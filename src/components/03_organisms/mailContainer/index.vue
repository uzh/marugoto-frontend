<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MailContainer',
  data(){
    return{
      title: 'MailContainer',
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
}
</script>
