<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'Student',
  components: { SvgIcon },
  props: [ 'item' ],
};
</script>