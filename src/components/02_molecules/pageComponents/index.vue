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
      videoHovered: false,
    };
  },
  mounted() {
    const video = document.getElementById("video");
    const playBig = document.getElementById("play-big");
    const playSmall = document.getElementById("play-small");
    const fullScreen = document.getElementById("full-screen");
    const seekBar = document.getElementById("seek-bar");

    playBig.addEventListener("click", function() {
      this.videoDuration = video.duration;
      if (video.paused == true) {
        video.play();
      } else {
        video.pause();
      }
    });

    playSmall.addEventListener("click", function() {
      if (video.paused == true) {
        video.play();
      } else {
        video.pause();
      }
    });

    fullScreen.addEventListener("click", function() {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    });

    seekBar.addEventListener("change", function() {
      let time = video.duration * (seekBar.value / 100);
      video.currentTime = time;
    });

    video.addEventListener("timeupdate", function() {
      let value = (100 / video.duration) * video.currentTime;
      seekBar.value = value;
    });

    seekBar.addEventListener("mousedown", function() {
      video.pause();
    });
  },
  computed: {
    ...mapGetters([ 'get_PageComponents', 'get_layoutState' ]),
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
