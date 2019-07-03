<template src="./template.html"></template>

<script>
import SvgMarker from '@/components/01_atoms/svgMarker';

export default {
  name: 'NotebookList',
  components: { SvgMarker },
  props: [ 'list', 'selected' ],
}
</script>
