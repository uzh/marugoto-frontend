<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'login',
  data(){
    return{
      loginForm: true,
    }
  },
  computed: {
    ...mapGetters([ 'get_loggedStatus' ]),
  },
}
</script>
