<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'StatusBar',
  components: { svgIcon },
  data() {
    return {
      timeIcon: true,
      time: true,
      money: true,
    };
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
}
</script>
