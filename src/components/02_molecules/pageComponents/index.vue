<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters([ 'get_PageComponents', 'get_layoutState' ]),
  },
  data: function() {
    return {
      selectedDate: null,
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'L',
        data: ['YYYY-MM-DD']
      },
      dateFormated: '',
    };
  },
  methods: {
    dateEmit: function(event, id) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.dateFormated = `${d}/${m}/${event.year}.`;
      this.submitAnswer(this.dateFormated, id);
    },
    submitAnswer: function(answer, excersiseId) {
      apiService.put(`states/${excersiseId}?inputState=${answer}`)
      .then(resp => {
        if( resp.data.statesChanged ){
          this.checkState();
        }
      })
      .catch(() => {
        
      });
    },
    checkState: function() {
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
    dialogOptionEmited: function(dialogId) {
      apiService.get(`dialog/${dialogId}`)
      .then(resp => {
        console.log(resp)
        this.$store.dispatch('DIALOG_UPDATE', resp.data.speech);
      })
      .catch(() => {
        
      });
    },
  },
}
</script>
