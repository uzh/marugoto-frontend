<template src="./template.html"></template>

<script>
import apiService from '@/apiService'
import ExerciseRadio from './exerciseRadio'
import ExerciseText from './exerciseText'

export default {
  name: 'Exercise',
  components: { ExerciseRadio, ExerciseText },
  props: [ 'exercises' ],
  methods: {
    submitAnswer: function(answer, id){
      apiService.put('states/' + id + '?inputState=' + answer)
      .then(resp => {
        this.checkState();
      })
      .catch(() => {
        
      });
    },
    checkState(){
      apiService.get('states')
      .then( resp => {
        this.$emit('emitStatesChanged');
      })
      .catch(() => {
        
      });
    },
  },
}
</script>
