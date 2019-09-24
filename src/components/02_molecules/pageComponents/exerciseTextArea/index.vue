<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex'
// eslint-disable-next-line
import { _debounce } from 'lodash';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ExerciseTextArea',
  components: { svgIcon },
  props: [ 'exerciseId', 'placeholder', 'formatedInput' ],
  data(){
    return {
      textareaRows: 5,
      minRows: 5,
      containerRows: 5,
      answer: '',
      isTyping: false,
      isAutosaved: false,
    }
  },
  computed:{
    ...mapGetters(['get_exerciseText']),
  },
  mounted: function(){
    if( this.get_exerciseText.value != '' ){
      this.answer = this.get_exerciseText.value;
      this.textareaRows = this.get_exerciseText.rows;
    }else if( this.formatedInput != '' ){
      this.answer = this.formatedInput;
    }
  },
  methods: {
    submitAnswer: function(){
      this.$emit('emitInputAreaAnswer', this.answer, this.exerciseId);
      this.$store.dispatch('SAVE_TEXT_FOR_EXERCISE', {
        value: this.answer,
        rows: this.textareaRows,
      });
    },
    typing: function(e) {
      this.isAutosaved = false;
      this.isTyping = true;
      this.autoGrow(e.currentTarget);
    },
    checkTyping: function() {
      this.isAutosaved = false;
      this.typingFinished();
    },
    paste: function(e){
      this.autoGrow(e.currentTarget);
    },
    // eslint-disable-next-line
    typingFinished: _.debounce(function() {
      this.isAutosaved = true;
      this.submitAnswer();
      this.isTyping = false;
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
  },
  watch: {
    exerciseId: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.answer = '';
      }
    },
  },
}
</script>
