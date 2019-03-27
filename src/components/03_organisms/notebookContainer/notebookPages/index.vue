<template src="./template.html"></template>

<script>
// eslint-disable-next-line
import { _debounce } from 'lodash';
import { mapGetters } from 'vuex';
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
      pageTransitionId: '',
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
  updated() {
    this.pageTransitionId = this.get_transitions[0].pageTransition.id;
  },
  computed: {
    ...mapGetters([ 'get_personalNoteStatus', 'get_transitions' ]),
  },
  methods: {
    toggleScroll: function() {
      this.$emit('toggleScroll');
    },
    addPersonalNote: function(id){
      if(this.get_personalNoteStatus == false) {
        this.$store.dispatch('CHANGE_PERSONAL_NOTE_STATUS', true);
        this.changePersonalNote(true);
        this.openedPersonalNote = true;
        this.personalNoteNotebookEntryId = id;
      }
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
    currentEntry: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.$store.dispatch('CHANGE_PERSONAL_NOTE_STATUS', false);
        this.$store.dispatch('REQUEST_PERSONAL_NOTE', this.list[this.currentEntry].id);
        this.openedPersonalNote = false;
      }
    },
    personalNoteNotebookEntryId: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.personalNoteText = '';
      }
    },
    pageTransitionId: function(newVal, oldVal) {
      if( newVal != oldVal ){
        if(this.personalNoteText != '') {
          this.submitPersonalNote();
        }
      }
    },
  },
}
</script>