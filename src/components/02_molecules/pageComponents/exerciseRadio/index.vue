<template src="./template.html"></template>

<script>
import InputRadio from '@/components/01_atoms/inputs/radio'

export default {
  name: 'ExerciseRadio',
  props: [ 'list', 'exerciseId', 'name' ],
  components: { InputRadio },
  methods: {
    emitAnswer: function(answer){
      this.$emit('emitRadioChange', answer, this.exerciseId);
    },
  },
}
</script>
