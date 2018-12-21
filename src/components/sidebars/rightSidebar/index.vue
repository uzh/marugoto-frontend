<template src="./template.html"></template>

<script>
import { mapGetters, mapActions } from 'vuex';
import svgIcon from '@/components/svgicon';

export default {
  name: 'RightSidebar',
  components: { svgIcon },
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
