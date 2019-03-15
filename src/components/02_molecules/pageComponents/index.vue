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
      videoID: '',
      seekBar: '',
      videoCurrentTime: '0:00',
      videoDuration: '',
    };
  },
  mounted() {
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
      this.seekBar = document.getElementById("seek-bar");
    }
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
      this.seekBar = document.getElementById("seek-bar");
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
          pageComponents: resp.data.pageComponents,
          topicState: resp.data.topicState,
          page: resp.data.page,
          dialogNotifications: resp.data.dialogNotifications,
          mailNotifications: resp.data.mailNotifications,
        });
      })
      .catch(() => {
        
      });
    },
    togglePlay: function() {
      if (this.videoID.paused == true) {
        this.videoID.play();
      } else {
        this.videoID.pause();
      }
    },
    toggleFullScreen: function() {
      if (this.videoID.requestFullscreen) {
        this.videoID.requestFullscreen();
      } else if (this.videoID.mozRequestFullScreen) {
        this.videoID.mozRequestFullScreen();
      } else if (this.videoID.webkitRequestFullscreen) {
        this.videoID.webkitRequestFullscreen();
      }
    },
    moveRangeThumb: function() {
      this.videoID.pause();
    },
    rangeThumbMoved: function() {
      this.videoID.play();
    },
    changeTimeRange: function() {
      let time = this.videoID.duration * (this.seekBar.value / 100);
      this.videoID.currentTime = time;
    },
    updateTimeRange: function() {
      let value = (100 / this.videoID.duration) * this.videoID.currentTime;
      this.seekBar.value = value;
      let minutes = Math.floor(this.videoID.currentTime / 60);
      let seconds = Math.floor(this.videoID.currentTime) - minutes * 60;
      if (seconds % 60 < 10) {
        this.videoCurrentTime = `${minutes}:0${seconds}`;
      } else {
        this.videoCurrentTime = `${minutes}:${seconds}`;
      }
    }
  },
}
</script>
