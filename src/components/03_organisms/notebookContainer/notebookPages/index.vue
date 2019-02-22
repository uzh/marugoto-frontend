<template src="./template.html"></template>

<script>
import {_debounce} from 'lodash';
import svgIcon from '@/components/01_atoms/svgicon';
import Btn from '@/components/01_atoms/buttons';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'NotebookPages',
  components: { svgIcon, Btn, VueMarkdown },
  props: [ 'currentEntry', 'list', 'direction' ],
  data(){
    return {
      transitionTime: 300,
      openedPersonalNote: false,
      personalNoteNotebookEntryId: '',
      personalNoteText: '',
      autosaveText: '',
      autosavedText: '',
    }
  },
  created() {
    var self = this;
    if( this.list.length > 0 ){
      setTimeout(function(){
        self.$store.dispatch('REQUEST_PERSONAL_NOTE', self.list[self.currentEntry].id);
      }, 1000);
    }
  },
  methods: {
    toggleScroll: function() {
      this.$emit('toggleScroll');
    },
    addPersonalNote: function(id){
      this.openedPersonalNote = true;
      this.personalNoteNotebookEntryId = id;
    },
    submitPersonalNote: function() {
      this.$store.dispatch('ADD_PERSONAL_NOTE', {
        id: this.personalNoteNotebookEntryId.split('/')[1],
        text: this.personalNoteText,
      });
      this.personalNoteNotebookEntryId = '';
      this.personalNoteText = '';
      this.openedPersonalNote= false;
    },
    cancelPersonalNote: function() {
      this.openedPersonalNote = false;
    },
    updateNoteText: function() {
      this.autosaveText = this.personalNoteText;
    },
    updatedNoteText: function() {
      this.autosaveText = '';
      this.autosavedText = this.personalNoteText;
    },
    checkTyping: _.debounce(function() {
      this.updateNoteText();
      setTimeout(() => {
        this.updatedNoteText()
      }, 1000);
    }, 2000),
  },
  watch: {
    currentEntry: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.$store.dispatch('REQUEST_PERSONAL_NOTE', this.list[this.currentEntry].id);
        this.openedPersonalNote= false;
      }
    },
    personalNoteNotebookEntryId: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.personalNoteText = '';
      }
    },
  },
}
</script>