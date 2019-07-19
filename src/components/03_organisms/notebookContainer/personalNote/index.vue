<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import SvgIcon from '@/components/01_atoms/svgicon';
import Btn from '@/components/01_atoms/buttons';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'NotebookPages',
  components: { SvgIcon, Btn, VueMarkdown },
  props: [ 'page' ],
  data(){
    return {
      showTextarea: false,
      noteText: '',
      isAutosaved: false,
      editorActive: false,
    }
  },
  computed: {
    ...mapGetters([ 'get_noteEditorState', 'get_personalNotes' ]),
  },
  updated: function(){
    this.$nextTick(function(){
      if( this.editorActive ){
        this.$refs[`note${this.page.id}`].focus();
      }
    });
  },
  mounted: function() {
    let pageId = this.page.id.slice( this.page.id.indexOf('/') + 1, this.page.id.length);
    let stateNote = this.get_personalNotes.findIndex( s => s.id == pageId );

    if( stateNote != -1 ){
      this.noteText = this.get_personalNotes[stateNote].text;
      this.showTextarea = true;
    }
  },
  methods: {
    blurEditor: function() {
      this.editorActive = false;
      if( this.noteText == '' ){
        this.showTextarea = false;
      }else{
        this.showTextarea = true;
      }
    },
    focusEditor: function() {
      this.showTextarea = true;
      this.editorActive = true;
    },
    checkTyping: function(e) {
      this.isAutosaved = false;
      this.autoGrow(e.currentTarget);
      this.typingFinished();
    },
    // eslint-disable-next-line
    typingFinished: _.debounce(function() {
      this.isAutosaved = true;
      this.submitPersonalNote();
    }, 500),
    autoGrow: function(element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    },
    submitPersonalNote: function() {
      this.$store.dispatch('UPDATE_PERSONAL_NOTES', {
        id: this.page.id.split('/')[1],
        text: this.noteText,
      });
    },
  },
  watch: {
    get_noteEditorState: function(newVal) {
      if( newVal ){
        this.noteText = '';
        this.editorActive = true;
      }
    },
  },
}

</script>
