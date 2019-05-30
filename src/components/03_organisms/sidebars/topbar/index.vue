<template src="./template.html"></template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'StatusBar',
  components: { svgIcon },
  data() {
    return {
      time: '',
    };
  },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_page', 'get_gameState', 'get_pageTimer' ]),
  },
  created: function() {
    if( this.get_pageTimer > 0 ){
      this.counter();
    }
  },
  methods: {
    counter: function() {
      var timeDistance;

      if( this.get_pageTimer > 0 ){
        timeDistance = this.get_pageTimer;
      }else{
        timeDistance = this.get_page.timeLimit;
      }
      var minutes, seconds;
      // timeDistance = 3000;
      var self = this;
      var timer = setInterval( function(){
          if( timeDistance > 0 ){
              timeDistance--;
              minutes = Math.floor(timeDistance / 60 );
              seconds = Math.floor(timeDistance % 60);
              
              self.$store.dispatch('UPDATE_TIMER', timeDistance);
              self.time = `${minutes} min ${seconds} sec`;
          }else{
              clearInterval(timer);
          }
      }, 1000 );
    },
  },
  watch: {
    "get_page.timerVisible": function(newVal) {
      if( newVal ){
        this.counter();
      }
    },
  },
}
</script>
