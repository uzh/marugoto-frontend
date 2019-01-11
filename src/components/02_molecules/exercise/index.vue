<template src="./template.html"></template>

<script>
import ExerciseRadio from './exerciseRadio'
import ExerciseText from './exerciseText'

export default {
  name: 'Exercise',
  components: { ExerciseRadio, ExerciseText },
  props: [ 'exercises' ],
}
</script>
