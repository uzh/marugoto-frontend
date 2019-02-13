<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ImageComponent',
  components: { VueMarkdown, SvgIcon },
  props: [ 'source', 'text', 'zoomable' ],
  methods: {
    emitZoom() {
      this.$emit('zoomImage');
    },
  },
}
</script>
