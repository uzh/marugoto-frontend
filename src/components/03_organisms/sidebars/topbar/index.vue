<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StatusBar',
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
}
</script>
