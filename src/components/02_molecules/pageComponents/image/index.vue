<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ImageComponent',
  components: { VueMarkdown, SvgIcon },
  props: [ 'sourceList', 'text', 'zoomable', 'captionOffset' ],
  data() {
    return {
      imageZoomed: false,
      zoomLevel: 2,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      sourceIndex: 0,
      dummyList: [
        {path: 'http://s2.glbimg.com/-DBjjL8oYQwHmpEfsjpl-XwK068=/620x413/e.glbimg.com/og/ed/f/original/2016/11/04/troller-bold-12.jpg'},
        {path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHHABUD4qvBkAe3SIxa8QbbNhemwnieoTUgA8SkU_lSUGhLgg'},
        {path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5r56z0K2SRdUdodhz7Yv7fGthoEHHvJ4bUpEHMzoI4HpVq0yn'}
      ]
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
    gallerySlide: function(){
      if( this.sourceList.length > 1 ){
        return true;
      }else{
        return false;
      }
    },
  },
  methods: {
    toggleZoom: function() {
      this.imageZoomed = !this.imageZoomed;
      if (!this.imageZoomed) {
        this.zoomLevel = 0;
      } else {
        this.zoomLevel = 2;
      }
    },
    incZoom: function() {
      if(this.imageZoomed && this.zoomLevel < 10) {
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
    },
    prevImage: function() {
      if( this.sourceIndex > 0 ){
        this.sourceIndex--;
      }
    },
    nextImage: function() {
      if( this.sourceIndex < this.sourceList.length -1 ){
        this.sourceIndex++;
      }
    },
  }
}
</script>
