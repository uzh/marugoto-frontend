<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import NotebookList from './notebookList';
import NotebookChapterMenu from './notebookChapterMenu';
import NotebookPages from './notebookPages';

export default {
  name: 'NotebookContainer',
  components: { NotebookList, NotebookChapterMenu, NotebookPages },
  props: ['entryList'],
  data(){
    return {
      highestElement: 0,
      currentEntry: 0,
      entriesMenuOpened: true,
    };
  },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_notebook' ]),
  },
  mounted: function() {
    this.scrollNotebookContent(10);
  },
  methods: {
    scrollNotebookContent: function(val) {
      this.$refs.notebookContainer.scrollTop = val;
    },
    openEntriesMenu: function() {
      this.entriesMenuOpened = !this.entriesMenuOpened;
      if (this.entriesMenuOpened) {
        this.scrollNotebookContent(10);
      } else {
        this.scrollNotebookContent(0);
      }
    },
    nextEntry: function() {
      if( this.currentEntry == this.get_notebook.list.length - 1 ){
        this.currentEntry = 0;
      }else{
        this.currentEntry++;
      }
    },
    prevEntry: function() {
      if( this.currentEntry == 0 ){
        this.currentEntry = this.get_notebook.list.length - 1;
      }else{
        this.currentEntry--;
      }
    },
    setCurrentEntry: function(index) {
      this.currentEntry = index;
      this.openEntriesMenu();
    },
    lastEntry: function() {
      this.currentEntry = this.get_notebook.list.length - 1;
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
  },
}
</script>
