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
import LinkComponent from './linkComponent'
import ExerciseTextArea from './exerciseTextArea'
import ExerciseUpload from './exerciseUpload'
import AudioComponent from '@/components/02_molecules/pageComponents/audioComponent';
import VideoComponent from '@/components/02_molecules/pageComponents/videoComponent';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'PageComponents',
  components: { 
    VueMarkdown, ExerciseRadio, 
    ExerciseCheckbox, ExerciseText, 
    TextComponent, ImageComponent, 
    ExerciseTextArea, SvgIcon, LinkComponent, ExerciseUpload,
    AudioComponent, VideoComponent },
  props: [ 'exercises' ],
  data: function() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      selectedDate: null,
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['DD.MM.YYYY'],
        dayPopover: 'L',
        data: ['YYYY-MM-DD']
      },
      dateFormated: '',
      videoHovered: false,
      videoPaused: true,
      videoID: '',
      videoSeekBar: '',
      videoCurrentTime: '0:00',
      videoDuration: '',
    };
  },
  updated() {
    if(document.getElementById("video")) {
      let self = this;
      document.getElementById("video").onloadedmetadata = function() {
        let minutes = Math.floor(document.getElementById("video").duration / 60);
        let seconds = Math.floor(document.getElementById("video").duration) - minutes * 60;
        if (seconds % 60 < 10) {
          self.videoDuration = `${minutes}:0${seconds}`;
        } else {
          self.videoDuration = `${minutes}:${seconds}`;
        }
      };
      this.videoID = document.getElementById("video");
      this.videoSeekBar = document.getElementById("video-seek-bar");
    }
  },
  computed: {
    ...mapGetters([ 'get_PageComponents', 'get_layoutState' ]),
  },
  methods: {
    dateEmit: function(event, id) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.dateFormated = `${d}.${m}.${event.year}`;
      this.submitAnswer(this.dateFormated, id);
    },
    submitAnswer: function(answer, exerciseId) {
      
      this.$store.dispatch('SUBMIT_EXERCISE_STATE', {
        id: exerciseId,
        answer: answer,
      })
      .then(resp => {
        if( resp.data.statesChanged ){
          this.checkState();
        }
      })
      .catch(() => {});
    },
    checkState: function() {
      apiService.get('states') 
      .then( resp => {
        this.$store.dispatch('UPDATE_PAGE_STATE', {
          pageTransitionStates: resp.data.pageTransitionStates, 
          pageComponents: resp.data.pageComponents,
          topicState: resp.data.topicState,
          page: resp.data.page,
          gameState: resp.data.gameState,
          dialogNotifications: resp.data.dialogNotifications,
          mailNotifications: resp.data.mailNotifications,
        });
      })
      .catch(() => {
        
      });
    },
    controllComponentLayout: function() {
      if( this.get_layoutState.notebook.opened ){
        setTimeout(function(){
          let listOfElements = document.querySelectorAll('.component-wrapper');
          listOfElements.forEach(element => {
            element.classList.add('col-xs-12-important');
          });
        }, 100);
      }else{
        setTimeout(function(){
          let listOfElements = document.querySelectorAll('.component-wrapper');
          listOfElements.forEach(element => {
            element.classList.remove('col-xs-12-important');
          });
        }, 100);
      }
    },
  },
  watch: {
    "get_layoutState.notebook.opened": function(newVal, oldVal) {
      if( newVal != oldVal && newVal ){
        
        setTimeout(function(){
          let listOfElements = document.querySelectorAll('.component-wrapper');
          listOfElements.forEach(element => {
            element.classList.add('col-xs-12-important');
          });
        }, 100);
        
      }else{
        setTimeout(function(){
          let listOfElements = document.querySelectorAll('.component-wrapper');
          listOfElements.forEach(element => {
            element.classList.remove('col-xs-12-important');
          });
        }, 100);
      }
    },
  },
}
</script>
