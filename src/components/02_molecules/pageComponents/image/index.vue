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
      zoomLevel: 5,
    }
  },
  methods: {
    toggleZoom: function() {
      this.imageZoomed = !this.imageZoomed;
    },
    incZoom() {
      if(this.imageZoomed && this.zoomLevel < 5) {
        this.zoomLevel++;
      }
    },
    decZoom() {
      if(this.imageZoomed && this.zoomLevel > 0) {
        this.zoomLevel--;
      }
    },
  }
}
</script>
