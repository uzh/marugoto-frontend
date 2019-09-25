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
      textareaRows: 2,
      minRows: 2,
      containerRows: 2,
      showTextarea: false,
      noteText: '',
      isTyping: false,
      isAutosaved: false,
      editorActive: false,
    }
  },
  computed: {
    ...mapGetters([ 'get_noteEditorState', 'get_personalNotes', 'get_layoutState' ]),
  },
  updated: function(){
    this.$nextTick(function(){
      if( this.editorActive ){
        this.$refs[`note${this.page.id}`].focus();
      }
      if( this.noteText == '' ){
        this.textareaRows = 2;
      }
    });
  },
  mounted: function() {
    let pageId = this.page.id.slice( this.page.id.indexOf('/') + 1, this.page.id.length);
    let stateNote = this.get_personalNotes.findIndex( s => s.id == pageId );

    if( stateNote != -1 ){
      this.noteText = this.get_personalNotes[stateNote].text;
      this.textareaRows = this.get_personalNotes[stateNote].rows;
      this.showTextarea = true;
      this.containerRows = this.textareaRows;
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
    typing: function(e) {
      this.isAutosaved = false;
      this.isTyping = true;
      this.autoGrow(e.currentTarget);
    },
    paste: function(e){
      this.autoGrow(e.currentTarget);
    },
    checkTyping: function() {
      this.isAutosaved = false;
      this.typingFinished();
    },
    // eslint-disable-next-line
    typingFinished: _.debounce(function() {
      this.isTyping = false;
      this.isAutosaved = true;
      this.submitPersonalNote();
    }, 500),
    autoGrow: function(element) {
      var self = this;
      this.containerRows = this.textareaRows;
      this.textareaRows = this.minRows;
      this.$nextTick(()=>{
        let rows = Math.ceil(( element.scrollHeight / 32 ) - this.minRows);
        this.textareaRows = this.minRows + rows;
        if( this.textareaRows <= 1 ){
          this.textareaRows = 2;
        }
        setTimeout(function(){
          self.containerRows = self.textareaRows;
        }, 100);
      })
    },
    submitPersonalNote: function() {
      this.$store.dispatch('UPDATE_PERSONAL_NOTES', {
        id: this.page.id.split('/')[1],
        text: this.noteText,
        rows: this.textareaRows,
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
