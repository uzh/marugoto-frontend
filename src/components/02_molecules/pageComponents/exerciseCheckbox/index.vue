<template src="./template.html"></template>

<script>
import InputCheckbox from '@/components/01_atoms/inputs/checkbox'

export default {
  name: 'ExerciseCheckbox',
  props: [ 'list', 'exerciseId' ],
  components: { InputCheckbox },
  methods: {
    submitAnswer: function(answer){
      this.$emit('emitAnswer', answer, this.exerciseId);
    },
  },
}
</script>
