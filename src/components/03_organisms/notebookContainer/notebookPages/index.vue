<template src="./template.html"></template>

<script>
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'NotebookPages',
  components: { svgIcon },
  props: [ 'currentEntry', 'list', 'direction' ],
  data(){
    return {
      transitionTime: 300,
    }
  },
  mounted: function() {
    if( this.list.length > 0){
      this.populatePage('.np-front', this.list[this.currentEntry]);
    }
  },
  methods: {
    toggleScroll: function() {
      this.$emit('toggleScroll');
    },
    populatePage: function(element, value) {
      let pageElement = document.querySelector(element);
      pageElement.querySelector('.notebook-header .title').innerText = value.title;
      pageElement.querySelector('.text').innerText = value.text;
    },
    animateNextPage: function() {
      let front = document.querySelector('.np-front');
      let middle = document.querySelector('.np-middle');
      let back = document.querySelector('.np-back');

      front.classList.add('next-out');
      middle.classList.add('next-in');
      back.classList.add('next-in');
      setTimeout(function(){
        front.classList.add('scale-back');
        middle.className = 'np-front';
        back.className = 'np-middle';
      }, this.transitionTime);

      setTimeout(function(){
        front.className = 'np-back';
      },this.transitionTime * 1.5);
    },
    animatePrevPage: function() {
      let front = document.querySelector('.np-front');
      let middle = document.querySelector('.np-middle');
      let back = document.querySelector('.np-back');

      back.classList.add('prev-out');
      front.classList.add('prev-back');
      middle.classList.add('prev-back');
      
      setTimeout(function(){
        back.classList.add('scale-in');
        front.className = 'np-middle';
        middle.className = 'np-back';
      }, this.transitionTime);

      setTimeout(function(){
        back.className = 'np-front';
      },this.transitionTime * 1.5);
    },
    openEntriesMenu: function() {},
  },
  watch: {
    list: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.populatePage('.np-front', this.list[this.list.length - 1]);
      }
    },
    currentEntry: function (newValue, oldValue) {
      if( newValue > oldValue ){
        // Middle element gets newValue
        this.populatePage('.np-middle', this.list[newValue]);
        this.animateNextPage();
      }else if( newValue < oldValue ){
        // Back element gets newValue
        this.populatePage('.np-back', this.list[newValue]);
        this.animatePrevPage();
      }
    }
  },
}
</script>