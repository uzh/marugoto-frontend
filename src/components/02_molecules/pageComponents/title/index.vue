<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon'

export default {
  name: 'TitleComponent',
  components: { SvgIcon },
  props: [ 'title' ],
  data() {
    return {
      
    };
  }
}
</script>
