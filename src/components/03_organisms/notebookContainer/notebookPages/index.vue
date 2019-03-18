<template src="./template.html"></template>

<script>
// eslint-disable-next-line
import { _debounce } from 'lodash';
import svgIcon from '@/components/01_atoms/svgicon';
import Btn from '@/components/01_atoms/buttons';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'NotebookPages',
  components: { svgIcon, Btn, VueMarkdown },
  props: [ 'currentEntry', 'list', 'direction' ],
  data(){
    return {
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      transitionTime: 300,
      openedPersonalNote: false,
      personalNoteNotebookEntryId: '',
      personalNoteText: '',
      isAutosaved: false,
      noteChanged: false,
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
    checkTyping: function() {
      this.isAutosaved = false;
      this.autoGrow(this.$refs.note[0]);
      this.typingFinished();
    },
    // eslint-disable-next-line
    typingFinished: _.debounce(function() {
      this.isAutosaved = true;
    }, 500),
    changePersonalNote: function() {
      this.noteChanged = !this.noteChanged;
    },
    autoGrow: function(element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
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