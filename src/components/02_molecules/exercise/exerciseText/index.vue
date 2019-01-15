<template src="./template.html"></template>

<script>
import InputField from '@/components/01_atoms/inputs/text';

export default {
  name: 'ExerciseText',
  components: { InputField },
  props: [ 'question', 'exerciseId' ],
  data(){
    return{
      answer: '',
    }
  },
  methods: {
    submitAnswer: function(){
      this.$emit('emitAnswer', this.answer, this.exerciseId);
    },
  }
}
</script>
