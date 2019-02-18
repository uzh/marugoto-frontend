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
      imageZoomed: "0",
    }
  },
  methods: {
    toggleZoom() {
      if(this.imageZoomed < "5") {
        this.imageZoomed = "5";
      } else {
        this.imageZoomed = "0";
      }
    },
    incZoom() {
      if(this.imageZoomed < "5") {
        this.imageZoomed = this.imageZoomed + "1";
      }
    },
    decZoom() {
      if(this.imageZoomed > "0") {
        this.imageZoomed = this.imageZoomed - "1";
      }
    },
  }
}
</script>
