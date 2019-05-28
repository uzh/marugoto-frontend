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
    panImage: function() {
      let scPanel = this.$refs.imageScrollPanel;
      // Get client position X and Y
      let clientX = event.clientX;
      let clientY = event.clientY;
      
      this.calibratedX = clientX - (this.prevX + 50);
      this.calibratedY = clientY - (this.prevY + 50) ;

      if( this.calibratedX <= this.limitScrollX && this.calibratedY <= this.limitScrollY ){
        //console.log('scroll: ', this.calibratedX, " - ",this.calibratedY)
        scPanel.scroll(this.calibratedX,this.calibratedY);
      }
      
    },
    toogleZoom: function(){
      this.$emit('zoomOut');
    },
    zoomIn: function() {
      // TODO make it percentage
      this.$refs.zoomImage.style.width = this.$refs.zoomImage.width + 100 + 'px';
      this.$refs.zoomImage.style.height = this.$refs.zoomImage.height + 100 + 'px';
      this.countScrollDimensions();
    },
    zoomOut: function() {
      this.$refs.zoomImage.style.width = this.$refs.zoomImage.width - 100 + 'px';
      this.$refs.zoomImage.style.height = this.$refs.zoomImage.height - 100 + 'px';
      this.countScrollDimensions();
    },

  }
}
</script>
