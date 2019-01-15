<template src="./template.html"></template>

<script>

export default {
  name: 'ExerciseRadio',
  props: [ 'list', 'exerciseId' ],
  methods: {
    submitAnswer: function(answer){
      this.$emit('emitAnswer', answer, this.exerciseId);
    },
  },
}
</script>
