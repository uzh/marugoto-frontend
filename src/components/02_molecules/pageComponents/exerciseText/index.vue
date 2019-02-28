<template src="./template.html"></template>

<script>
import InputField from '@/components/01_atoms/inputs/text';

export default {
  name: 'ExerciseText',
  components: { InputField },
  props: [ 'exerciseId', 'placeholder' ],
  data(){
    return{
      answer: '',
    }
  },
  methods: {
    submitAnswer: function(){
      this.$emit('emitInputAnswer', this.answer, this.exerciseId);
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
