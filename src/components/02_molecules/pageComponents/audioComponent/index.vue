<template src="./template.html"></template>

<script>

import SvgIcon from '@/components/01_atoms/svgicon';
import Btn from '@/components/01_atoms/buttons';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'AudioComponent',
  components: { SvgIcon, Btn, VueMarkdown },
  props: [ 'source', 'componentID', 'numberOfColumns', 'caption' ],
  data(){
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      audioPaused: true,
      audioID: '',
      audioSeekBar: '',
      audioCurrentTime: '0:00',
      audioDuration: '',
    }
  },
  mounted() {
    let audioEl = this.$refs[`audio${this.componentID}`];
    let self = this;
    audioEl.onloadedmetadata = function() {
      let minutes = Math.floor(audioEl.duration / 60);
      let seconds = Math.floor(audioEl.duration) - minutes * 60;
      
      if (seconds % 60 < 10) {
        self.audioDuration = `${minutes}:0${seconds}`;
      } else {
        self.audioDuration = `${minutes}:${seconds}`;
      }
    };
    this.audioID = audioEl;
    this.audioSeekBar = this.$refs[`audio-seek-bar${this.componentID}`];
  },
  methods: {
    togglePlayAudio: function() {
      if (this.audioID.paused) {
        this.audioID.play();
        this.audioPaused = false;
      } else if (!this.audioID.paused) {
        this.audioID.pause();
        this.audioPaused = true;
      }
    },
    moveRangeAudioThumb: function() {
      this.audioID.pause();
      this.audioPaused = true;
    },
    rangeAudioThumbMoved: function() {
      this.audioID.play();
      this.audioPaused = false;
    },
    changeAudioTimeRange: function() {
      let time = this.audioID.duration * (this.audioSeekBar.value / 100);
      this.audioID.currentTime = time;
    },
    updateAudioTimeRange: function() {
      let value = (100 / this.audioID.duration) * this.audioID.currentTime;
      this.audioSeekBar.value = value;
      let minutes = Math.floor(this.audioID.currentTime / 60);
      let seconds = Math.floor(this.audioID.currentTime) - minutes * 60;
      if (seconds % 60 < 10) {
        this.audioCurrentTime = `${minutes}:0${seconds}`;
      } else {
        this.audioCurrentTime = `${minutes}:${seconds}`;
      }
      if(this.audioID.currentTime == this.audioID.duration) {
        this.audioPaused = true;
      }
    },
  },
}
</script>
