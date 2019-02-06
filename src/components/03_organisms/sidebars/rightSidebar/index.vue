<template src="./template.html"></template>

<script>
import { mapGetters, mapActions } from 'vuex';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'RightSidebar',
  components: { svgIcon },
  data(){
    return{
      title: 'RightSidebar',
      unreadMails: 1,
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
