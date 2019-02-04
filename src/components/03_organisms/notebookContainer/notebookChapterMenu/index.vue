<template src="./template.html"></template>

<script>
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'NotebookChapterMenu',
  components: { svgIcon },
  props: ['currentEntry', 'list'],
  data() {
    return {
      disabled: false,
      disabledDirection: false,
    };
  },
  methods: {
    emitChange: function(direction) {
      if( this.disabled) { return; }
      /**
       * Directions
       * Next, Prev, First Last
       */
      if( this.currentEntry < this.list.length - 1 && direction == 'next' ){
        // Next
        this.$emit('changeCurrentEntryTo', 'next');
      }else if(this.currentEntry != 0 && direction == 'prev') {
        // Prev
        this.$emit('changeCurrentEntryTo', 'prev');
      }else if( direction == 'last' ){
        // Last
        this.$emit('changeCurrentEntryTo', 'last');
      }else if( direction == 'first' ){
        this.$emit('changeCurrentEntryTo', 'first');
      }
      this.disabled = true;
      var self = this;
      setTimeout(function(){
        self.disabled = false;
      }, 600);
      
    },
  },
}
</script>
