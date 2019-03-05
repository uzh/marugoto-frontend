<template src="./template.html"></template>

<script>
import { _debounce } from 'lodash';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ExerciseTextArea',
  components: { svgIcon },
  props: [ 'exerciseId', 'placeholder' ],
  data(){
    return {
      answer: '',
      filledTextArea: true,
      autosaveText: '',
      autosavedText: '',
    }
  },
  methods: {
    submitAnswer: function(){
      this.$emit('emitInputAreaAnswer', this.answer, this.exerciseId);
    },
    updateText: function() {
      this.autosaveText = this.answer;
    },
    updatedText: function() {
      this.autosaveText = '';
      this.autosavedText = this.answer;
    },
    checkTyping: _.debounce(function() {
      this.updateText();
      setTimeout(() => {
        this.updatedText();
      }, 500);
    }, 1500),
    textareaHandler(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.submitAnswer();
      }
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
