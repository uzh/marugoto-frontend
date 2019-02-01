<template src="./template.html"></template>

<script>
import NotebookHeader from '../notebookHeader'

export default {
  name: 'NotebookPages',
  components: { NotebookHeader },
  props: [ 'currentEntry', 'list', 'direction' ],
  data(){
    return {
      transitionTime: 300,
    }
  },
  methods: {
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
    currentEntry: function (newValue, oldValue) {
      let front = document.querySelector('.np-front');
      let middle = document.querySelector('.np-middle');
      let back = document.querySelector('.np-back');

      if( newValue > oldValue ){
        // Middle element gets newValue
        middle.querySelector('h1').innerText = this.list[newValue].title;
        middle.querySelector('p').innerText = this.list[newValue].text;

        this.animateNextPage();
      }else if( newValue < oldValue ){
        // Back element gets newValue
        back.querySelector('h1').innerText = this.list[newValue].title;
        back.querySelector('p').innerText = this.list[newValue].text;

        this.animatePrevPage();
      }
    }
  },
}
</script>