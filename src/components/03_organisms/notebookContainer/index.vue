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
    this.currentEntry = this.get_notebook.list.length - 1;
  },
  updated: function() {
    if (this.entriesMenuOpened) {
      if(document.getElementsByClassName('np-page').length) {
        for(let i = 0; i < document.getElementsByClassName('np-page').length; i++) {
          document.getElementsByClassName('np-page')[i].classList.add('no-offset-top');
        }
        document.getElementsByClassName('notebook-content')[0].classList.add('changed-height');
      }
    } else {
      this.scrollNotebookContent(0);
      if(document.getElementsByClassName('np-page').length) {
        for(let i = 0; i < document.getElementsByClassName('np-page').length; i++) {
          document.getElementsByClassName('np-page')[i].classList.remove('no-offset-top');
        }
        document.getElementsByClassName('notebook-content')[0].classList.remove('changed-height');
      }
    }
  },
  methods: {
    scrollNotebookContent: function(val) {
      this.$refs.notebookContainer.scrollTop = val;
    },
    openEntriesMenu: function() {
      this.entriesMenuOpened = !this.entriesMenuOpened;
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
  watch: {
    'get_notebook.list': function(newVal, oldVal) {
      if( newVal.length != oldVal.length ){
        this.currentEntry = this.get_notebook.list.length - 1;
      }
    },
  },
}
</script>
