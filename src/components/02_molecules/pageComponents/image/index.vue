<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ImageComponent',
  components: { VueMarkdown, SvgIcon },
  props: [ 'source', 'text', 'zoomable' ],
  data() {
    return {
      imageZoomed: false,
    }
  },
  methods: {
    toggleZoom() {
      this.imageZoomed = !this.imageZoomed;
    },
  },
}
</script>
