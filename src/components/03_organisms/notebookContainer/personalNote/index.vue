<template src="./template.html"></template>

<script>

import SvgIcon from '@/components/01_atoms/svgicon';
import Btn from '@/components/01_atoms/buttons';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'NotebookPages',
  components: { SvgIcon, Btn, VueMarkdown },
  props: [ 'page' ],
  data(){
    return {
      openedPersonalNote: false,
      personalNoteText: '',
      isAutosaved: false,
      noteChanged: false,
      // New
      canBeEdited: true,
    }
  },
  methods: {
    addPersonalNote: function(){
      if(this.personalNoteText.length == 0) {
        this.changePersonalNote(false);
        this.openedPersonalNote = true;
      }else if( this.personalNoteText.length > 0 ){
        this.changePersonalNote(true);
        this.openedPersonalNote = false;
      }
    },
    submitPersonalNote: function() {
      this.$store.dispatch('ADD_PERSONAL_NOTE', {
        id: this.page.id.split('/')[1],
        text: this.personalNoteText,
      });
      this.personalNoteText = '';
      this.openedPersonalNote= false;
    },
    cancelPersonalNote: function() {
      this.openedPersonalNote = false;
    },
    checkTyping: function(e) {
      this.isAutosaved = false;
      this.autoGrow(e.currentTarget);
      this.typingFinished();
    },
    // eslint-disable-next-line
    typingFinished: _.debounce(function() {
      this.isAutosaved = true;
    }, 500),
    changePersonalNote: function(val) {
      if(val == false) {
        this.noteChanged = true;
      } else {
        this.noteChanged = false;
      }
    },
    autoGrow: function(element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  },
  watch: {
    personalNoteText: function(newVal){
      if( newVal.length == 0 ){
        this.canBeEdited = true;
      }else if( newVal.length > 0 ){
        this.canBeEdited = false;
      }
    },
    currentEntry: function(newVal, oldVal) {
      if( newVal != oldVal ){
        
        this.openedPersonalNote = false;
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
