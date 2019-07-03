<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ZoomPanel',
  components: { SvgIcon },
  props: [ 'imagesList' ],
  data() {
    return {
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      prevX: 0,
      prevY: 0,
      calibratedX: 0,
      calibratedY: 0,
      limitScrollX: 0,
      limitScrollY: 0,
      down: false,
      scrollLeft: 0,
      x: 0,
      scrollTop: 0,
      y: 0,
    }
  },
  mounted: function() {
    // Set image on start
    setTimeout(()=>{
      this.sizeImg();
      this.countScrollDimensions();
    }, 100);
  },
  methods: {
    dragStartFoo: function(e) {
      this.scrollLeft = this.$refs.scroller.scrollLeft;
      this.x = e.clientX;

      this.scrollTop = this.$refs.scroller.scrollTop;
      this.y = e.clientY;
      
    },
    panImage: function(e) {
      this.$refs.scroller.scrollLeft = this.scrollLeft + this.x - e.clientX;
      this.$refs.scroller.scrollTop = this.scrollTop + this.y - e.clientY;
    },
    countScrollDimensions: function() {
      let img = this.$refs.zoomImage;

      // Check if image is bigger than window
      if( this.windowWidth < img.width ){
        this.limitScrollX = img.width - this.windowWidth;
      }
      
      if( this.windowHeight < img.height ){
        this.limitScrollY = img.height - this.windowHeight;
      }
    },
    sizeImg: function() {
      let img = this.$refs.zoomImage;

      // Check if image is bigger than window
      if( this.windowWidth <= img.width ){
        img.style.width = this.windowWidth + 'px';
      }else if( this.windowHeight <= img.height ){
        img.style.height = this.windowHeight + 'px';
      }
      
    },
    resetPanVars: function() {
      this.prevX = event.clientX + 1;
      this.prevY = event.clientY + 1;
    },
    
    toogleZoom: function(){
      this.$emit('zoomOut');
    },
    zoomIn: function() {
      // TODO make it percentage
      this.$refs.zoomImage.style.width = this.$refs.zoomImage.width + 100 + 'px';
      this.$refs.zoomImage.style.height = 'auto'; // this.$refs.zoomImage.height + 100 + 'px';
      this.countScrollDimensions();
    },
    zoomOut: function() {
      this.$refs.zoomImage.style.width = this.$refs.zoomImage.width - 100 + 'px';
      this.$refs.zoomImage.style.height = 'auto'; // this.$refs.zoomImage.height - 100 + 'px';
      this.countScrollDimensions();
    },

  }
}
</script>
