<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex'
import apiService from '@/apiService'
import ExerciseRadio from './exerciseRadio'
import ExerciseText from './exerciseText'
import TextComponent from './text'

export default {
  name: 'PageComponents',
  components: { ExerciseRadio, ExerciseText, TextComponent },
  props: [ 'exercises' ],
  computed: {
    ...mapGetters([ 'get_PageComponents' ]),
  },
  methods: {
    submitAnswer: function(answer, id){
      apiService.put('states/' + id + '?inputState=' + answer)
      .then(resp => {
        if( resp.data.statesChanged ){
          this.checkState();
        }
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
