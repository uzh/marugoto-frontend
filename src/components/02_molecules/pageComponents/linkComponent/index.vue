<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'PageComponents',
  components: { SvgIcon },
  props: [ 'downloadLink' ],
}
</script>
