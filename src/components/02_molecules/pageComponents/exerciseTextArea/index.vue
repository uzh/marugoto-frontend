<template src="./template.html"></template>

<script>
// eslint-disable-next-line
import { _debounce } from 'lodash';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ExerciseTextArea',
  components: { svgIcon },
  props: [ 'exerciseId', 'placeholder' ],
  data(){
    return {
      answer: '',
      readyForSubmit: false,
    }
  },
  methods: {
    submitAnswer: function(){
      this.$emit('emitInputAreaAnswer', this.answer, this.exerciseId);
    },
    checkTyping: function() {
      this.readyForSubmit = false;
      this.typingFinished();
    },
    // eslint-disable-next-line
    typingFinished: _.debounce(function() {
      this.readyForSubmit = true;
    }, 300),
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
