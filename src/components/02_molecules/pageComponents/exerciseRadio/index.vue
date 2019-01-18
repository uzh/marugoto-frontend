<template src="./template.html"></template>

<script>
import InputRadio from '@/components/01_atoms/inputs/radio'

export default {
  name: 'ExerciseRadio',
  props: [ 'list', 'exerciseId' ],
  components: { InputRadio },
  methods: {
    submitAnswer: function(answer){
      this.$emit('emitAnswer', answer, this.exerciseId);
    },
  },
}
</script>
