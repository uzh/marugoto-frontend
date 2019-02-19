<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'StatusBar',
  components: { svgIcon },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_page', 'get_topicState' ]),
  },
}
</script>
