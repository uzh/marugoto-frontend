<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import SvgIcon from '@/components/01_atoms/svgicon';
import ZoomPanel from '@/components/02_molecules/pageComponents/image/zoomPanel';

export default {
  name: 'ImageComponent',
  components: { VueMarkdown, SvgIcon, ZoomPanel },
  props: [ 'sourceList', 'text', 'zoomable', 'captionOffset' ],
  data() {
    return {
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      imageZoomed: false,
      sourceIndex: 0,
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
  },
  watch: {
    sourceList: function(newVal, oldVal){
      if( newVal != oldVal){
        this.sourceIndex = 0;
      }
    }
  },
}
</script>
