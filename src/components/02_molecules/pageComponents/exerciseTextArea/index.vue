<template src="./template.html"></template>

<script>

export default {
  name: 'ExerciseTextArea',
  props: [ 'exerciseId', 'placeholder' ],
  data(){
    return {
      answer: '',
      filledTextArea: true,
    }
  },
  methods: {
    submitAnswer: function(){
      this.$emit('emitInputAreaAnswer', this.answer, this.exerciseId);
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
