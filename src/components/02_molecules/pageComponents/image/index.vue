<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ImageComponent',
  components: { VueMarkdown, SvgIcon },
  props: [ 'source', 'text', 'zoomable', 'captionOffset' ],
  data() {
    return {
      imageZoomed: false,
      zoomLevel: 5,
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
  methods: {
    toggleZoom: function() {
      this.imageZoomed = !this.imageZoomed;
      if (!this.imageZoomed) {
        this.zoomLevel = 0;
      } else {
        this.zoomLevel = 5;
      }
    },
    incZoom: function() {
      if(this.imageZoomed && this.zoomLevel < 5) {
        this.zoomLevel++;
      }
    },
    decZoom: function() {
      if(this.imageZoomed && this.zoomLevel > 0) {
        this.zoomLevel--;
      }
    },
    imageBlurred: function(e) {
      if(e.target == this.$refs.imageMask) {
        this.imageZoomed = false;
      }
    }
  }
}
</script>
