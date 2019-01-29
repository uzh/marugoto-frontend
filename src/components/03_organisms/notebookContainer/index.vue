<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import NotebookHeader from './notebookHeader';
import NotebookList from './notebookList';
import NotebookChapterMenu from './notebookChapterMenu';

export default {
  name: 'NotebookContainer',
  components: { NotebookHeader, NotebookList, NotebookChapterMenu },
  props: ['entryList'],
  data(){
    return {
      currentEntry: 0,
    };
  },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_notebook' ]),
  },
  methods: {
    chooseStory(item) {
      this.headerTitle = item.title;
      this.listItems.forEach(el => el.current = false);
      item.current = true;
    },
    nextEntry: function() {
      if( this.currentEntry == this.get_notebook.length - 1 ){
        this.currentEntry = 0;
      }else{
        this.currentEntry++;
      }
    },
    prevEntry: function() {
      if( this.currentEntry == 0 ){
        this.currentEntry = this.get_notebook.length - 1;
      }else{
        this.currentEntry--;
      }
    },
    setCurrentEntry: function(index) {
      this.currentEntry = index;
    },
    lastEntry: function() {
      this.currentEntry = this.get_notebook.length - 1;
    },
    firstEntry: function() {
      this.currentEntry = 0;
    },
    switchCurrentEntryTo: function(to) {
      if( to == 'first' ){
        this.firstEntry();
      }else if( to == 'prev' ) {
        this.prevEntry();
      }else if( to == 'next' ) {
        this.nextEntry();
      }else if( to == 'last' ) {
        this.lastEntry();
      }
    },
  }
}
</script>
