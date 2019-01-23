<template src="./template.html"></template>

<script>
import { mapGetters, mapActions } from 'vuex'
import apiService from '@/apiService'

import DialogExercise from '../dialog'
import ExerciseRadio from './exerciseRadio'
import ExerciseCheckbox from './exerciseCheckbox'
import ExerciseText from './exerciseText'
import TextComponent from './text'
import ImageComponent from './image'

export default {
  name: 'PageComponents',
  components: { DialogExercise, ExerciseRadio, ExerciseCheckbox, ExerciseText, TextComponent, ImageComponent },
  props: [ 'exercises' ],
  computed: {
    ...mapGetters([ 'get_PageComponents' ]),
  },
  methods: {
    submitAnswer: function(answer, excersiseId) {
      apiService.put('states/' + excersiseId + '?inputState=' + answer)
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
        this.$store.dispatch('UPDATE_PAGE_STATE', {
          pageTransitionStates: resp.data.pageTransitionStates, 
          pageComponents: resp.data.pageComponents
        });
      })
      .catch(() => {
        
      });
    },
  },
}
</script>
