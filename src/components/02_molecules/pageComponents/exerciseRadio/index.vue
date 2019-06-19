<template src="./template.html"></template>

<script>
import InputRadio from '@/components/01_atoms/inputs/radio'

export default {
  name: 'ExerciseRadio',
  props: [ 'list', 'exerciseId', 'name' ],
  components: { InputRadio },
  data: function() {
    return{
      stateID: this.exerciseId,
    }
  },
  methods: {
    emitAnswer: function(answer){
      this.$emit('emitRadioChange', answer, this.stateID);
    },
  },
}
</script>
