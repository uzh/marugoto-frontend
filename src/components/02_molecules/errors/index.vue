<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Errors',
  computed: {
    ...mapGetters([ 'get_errors', ]),
  },
}
</script>