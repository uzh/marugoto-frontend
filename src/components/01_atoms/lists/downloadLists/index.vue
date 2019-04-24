<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'downloadListItem',
  components: { SvgIcon },
  props: [ 'title', 'action' ],
  data() {
    return {

    };
  },
};
</script>