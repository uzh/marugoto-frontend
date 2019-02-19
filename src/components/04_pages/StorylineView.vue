<template>
  <div class="main-container">
    <!-- <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/> -->
    <TopicComponent v-if="!get_topic.selected" :list="get_topic.list" @openTopic="chooseTopic" />
    <div class="storyline-container" v-if="get_topic.selected">
      <vue-markdown class="storyline-title col-xs-10 col-xs-offset-1 mb-40 mt-30 h1" :source="get_page.title" />
      <!-- Components -->
      <PageComponents />
      <!-- Dialog -->
      <DialogComponent v-if="dialogVisible" v-for="(dialog, index) in get_dialog" :key="index"
        class="mb-40" 
        @emitDialog="dialogOptionEmited"
        :text="dialog.speech.markdownContent"
        :source="`http://localhost:8080/${dialog.from.image.path}`"
        :options="dialog.answers" />
      <!-- Page transitions -->
      <PageTransitions @transitionChoosen="requestPageTransition" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import apiService from '@/apiService';
import Timer from '@/timer';

import Btn from '@/components/01_atoms/buttons';
import PageTransitions from '@/components/02_molecules/pageTransitions';
import PageComponents from '@/components/02_molecules/pageComponents';
import TopicComponent from '@/components/02_molecules/pageComponents/topic';
import DialogComponent from '@/components/03_organisms/dialog';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'player',
  components: { Btn, DialogComponent, PageTransitions, PageComponents, TopicComponent, VueMarkdown },
  computed: {
    ...mapGetters([ 'get_page', 'get_topic', 'get_dialog', 'get_transitions', 'get_dialog' ]),
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {
    if( !this.get_topic.selected ){
      this.$store.dispatch('UPDATE_TOPIC_LIST');
    }else{
      this.$store.dispatch('REQUEST_PAGE_CURRENT')
      .then(() => {
        this.requester();
        this.$store.dispatch('MAIL_LIST_UPDATE');
      }); 
    };
    
  },
  methods: {
    requester: function() {
      // Request notebook & mail lists
      this.$store.dispatch('UPDATE_NOTEBOOK');
      // this.$store.dispatch('MAIL_LIST_UPDATE');
    },
    chooseTopic: function(id){
      this.$store.dispatch('CHOOSE_TOPIC', id)
      .then(() => {
        this.$store.dispatch('REQUEST_PAGE_CURRENT')
      .then(() => {
        this.requester();
      });
        
      });
    },
    requestPageTransition(id){
      this.$store.dispatch('REQUEST_PAGE_TRANSITION', id)
      .then(() => {
        this.requester();
        this.setDialogVisibility(false);
      });
    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    dialogOptionEmited: function(dialogId) {
      apiService.get(`dialog/${dialogId}`)
      .then(resp => {
        if( resp.data.stateChanged ){
          this.$store.dispatch('REQUEST_PAGE_CURRENT');
        }
      })
      .catch(() => {
        
      });
    },
    setDialogVisibility(visibility) {
      if( visibility ){
        this.dialogVisible = true;
      }else{
        this.dialogVisible = false;
      }
    },
  },
  watch: {
    get_page: function(newVal, oldVal) {
      if( newVal != oldVal ){
        document.querySelector('.page-container').scrollTop = 0;
      }

      // Check if page got timeLimit for transition trigger
      if( newVal.hasOwnProperty('timeLimit') ){
        new Timer(newVal.timeLimit, // Transition time
                  this.requestPageTransition, // Callback
                  this.get_transitions[0].pageTransition.id) // Callback payload
                  .start();
      }
    },
    get_dialog: function(newVal, oldVal) {
      if( newVal.length > 0 && newVal[0].hasOwnProperty('receiveAfter') ){
        new Timer(newVal[0].receiveAfter, // Transition time
                  this.setDialogVisibility, // Callback
                  true) // Callback payload
                  .start();
      }
    },
  },
}

</script>