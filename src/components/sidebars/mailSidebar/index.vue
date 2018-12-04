<template src="./template.html"></template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MailSidebar',
  data(){
    return{
      title: 'MailSidebar',
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
  methods: {
    ...mapActions([ 'LAYOUT_OPEN', 'LAYOUT_CLOSE' ]),
  },
}
</script>
