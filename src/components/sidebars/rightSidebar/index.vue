<template src="./template.html"></template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RightSidebar',
  data(){
    return{
      title: 'RightSidebar',
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
