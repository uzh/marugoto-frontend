<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ZoomPanel',
  components: { SvgIcon },
  props: [ 'imagePath', 'slider' ],
  data() {
    return {
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      limitScrollX: 0,
      limitScrollY: 0,
      down: false,
      scrollLeft: 0,
      x: 0,
      scrollTop: 0,
      y: 0,
      dragImage: '',
      hovered: false,
    }
  },
  mounted: function() {
    // Set image on start
    var img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    this.dragImage = img;

    setTimeout(()=>{
      this.sizeImg();
      this.countScrollDimensions();
    }, 100);
  },
  methods: {
    dragStartFoo: function(e) {
      e.dataTransfer.setDragImage(this.dragImage, 0, 0);

      this.scrollLeft = this.$refs.scroller.scrollLeft;
      this.x = e.clientX;

      this.scrollTop = this.$refs.scroller.scrollTop;
      this.y = e.clientY;

      this.hovered = true;
    },
    dragEndFoo: function() {
      this.hovered = false;
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
      let imgW = img.width;
      let imgH = img.height;

      if( imgW >= this.windowWidth ){
        if( imgW > imgH ){
          if( this.windowWidth > this.windowHeight ){
            // console.log('1a1')
            img.style.height = this.windowHeight + 'px';
          }else{
            // console.log('1a2')
            img.style.width = this.windowWidth + 'px';
          }
        }else{
          if( this.windowWidth > this.windowHeight ){
            // console.log('1b1')
            img.style.height = this.windowHeight + 'px';
          }else{
            // console.log('1b2')
            img.style.width = this.windowWidth + 'px';
          }
        }
      }
      else if( imgH >= this.windowHeight ){
        if( imgW > imgH ){
          if( this.windowHeight > this.windowHeight ){
            // console.log('2a1')
            img.style.width = this.windowWidth + 'px';
          }else{
            // console.log('2a2')
            img.style.height = this.windowHeight + 'px';
          }
        }else{
          if( this.windowHeight > this.windowHeight ){
            // console.log('2b1')
            img.style.width = this.windowWidth + 'px';
          }else{
            // console.log('2b2')
            img.style.height = this.windowHeight + 'px';
          }
        }
      }

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
    prevImage: function() {
      this.$emit('zoomPrevImage');
      this.$refs.zoomImage.style.width = "auto";
    },
    nextImage: function() {
      this.$emit('zoomNextImage');
      this.$refs.zoomImage.style.width = "auto";
    },
  },
}
</script>
