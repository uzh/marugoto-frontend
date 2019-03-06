<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex'
import apiService from '@/apiService'

import VueMarkdown from 'vue-markdown'
import ExerciseRadio from './exerciseRadio'
import ExerciseCheckbox from './exerciseCheckbox'
import ExerciseText from './exerciseText'
import TextComponent from './text'
import ImageComponent from './image'
import ExerciseTextArea from './exerciseTextArea'
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'PageComponents',
  components: { VueMarkdown, ExerciseRadio, ExerciseCheckbox, ExerciseText, TextComponent, ImageComponent, ExerciseTextArea, SvgIcon },
  props: [ 'exercises' ],
  computed: {
    ...mapGetters([ 'get_PageComponents', 'get_layoutState' ]),
  },
  data: function() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
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
      this.$store.dispatch('SUBMIT_EXERCISE_STATE', {
        id: excersiseId,
        answer: answer,
      })
      .then(resp => {
        if( resp.data.statesChanged ){
          this.checkState();
        }
      })
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
  },
}
</script>
