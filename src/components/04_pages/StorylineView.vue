<template>
  <div class="main-container">
    <div class="storyline-container" v-if="get_topic.selected">
      <div class="storyline-title col-xs-12">
        <div 
          class="page-title-icon-container"
          :class="get_layoutState.notebook.opened ? 'col-xs-2' : 'col-xs-1 col-xs-offset-1'"> 
          <img 
            v-if="get_page.chapter && get_page.chapter.icon" 
            class="icon" 
            :src="`${resourcesPath}${get_page.chapter.icon.path}`">
        </div>
        <vue-markdown class="page-title col-xs-10" :source="get_page.title" />
      </div>
      <!-- Components -->
      <PageComponents />
      <!-- Dialog -->
      <DialogComponent 
        v-if="get_layoutState.dialog.opened" 
        v-for="(dialog, index) in get_dialog" :key="index"
        class="mb-40"
        @emitDialog="dialogOptionEmited"
        :text="dialog.speech.markdownContent"
        :source="`${resourcesPath}${dialog.from.image.path}`"
        :dialogID="dialog.id"
        :options="dialog.answers" />
      <!-- Page transitions -->
      <PageTransitions @transitionChoosen="requestPageTransition" />
      <div
        v-if="get_page.endOfTopic"
        class="transition-wrapper col-xs-8 col-xs-offset-2"
        :class="get_layoutState.notebook.opened ? 'col-xs-10-important col-xs-offset-1' : ''">
        <Btn 
          text="Go to your games"
          primary="true"
          @click.native="backToGames" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Timer from '@/timer';

import Btn from '@/components/01_atoms/buttons';
import PageTransitions from '@/components/02_molecules/pageTransitions';
import PageComponents from '@/components/02_molecules/pageComponents';
import DialogComponent from '@/components/03_organisms/dialog';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'player',
  components: { Btn, DialogComponent, PageTransitions, PageComponents, VueMarkdown },
  data() {
    return {
      dialogVisible: false,
      basePath: process.env.VUE_APP_BASE_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      timerContainer: {},
      timerON: false,
      transitioned: false,
    };
  },
  computed: {
    ...mapGetters([ 
      'get_page', 
      'get_topic', 
      'get_dialog', 
      'get_transitions', 
      'get_dialog', 
      'get_layoutState', 
      'get_textExerciseExists',
      'get_pageTimer',
      'get_personalNotes' ]),
  },
  created() {
    this.$store.dispatch('REQUEST_PAGE_CURRENT')
    .then(() => {
      this.requester();
      this.$store.dispatch('MAIL_LIST_UPDATE');
    }); 
  },
  methods: {
    requester: function() {
      this.$store.dispatch('LAYOUT_OPEN');
      //this.$store.dispatch('UPDATE_NOTEBOOK');

      if( this.transitioned ){
        this.$store.dispatch('CLEAR_TEXT_FOR_EXERCISE');
        this.transitioned = false;
      }
    },
    updateNotebookPersonalNotesBeforePageTransition: function() {
      for( var ii=0; ii < this.get_personalNotes.length; ii++ ){
        this.$store.dispatch('ADD_PERSONAL_NOTE', {
          id: this.get_personalNotes[ii].id,
          text: this.get_personalNotes[ii].text,
        });
      }
      this.$store.dispatch('CLEAR_PERSONAL_NOTES');
    },
    requestPageTransition(payload){
      if( this.timerON ){
        this.timerContainer.stop();
      }
      this.timerON = false;
      this.updateNotebookPersonalNotesBeforePageTransition();
      
      if( this.get_textExerciseExists.exist ){
        // Here you can prevent to make transition if exercise is required but empty or 
        // grab exercise value before transition and update backend first
        this.$store.dispatch('SUBMIT_EXERCISE_STATE', {
          id: this.get_textExerciseExists.state.id,
          answer: document.getElementById(this.get_textExerciseExists.state.id).value,
        })
        .then(() => {
          this.$store.dispatch('REQUEST_PAGE_TRANSITION', payload)
          .then(() => {
            this.transitioned = true;
            this.requester();
          });
        })
      }else{
        this.$store.dispatch('REQUEST_PAGE_TRANSITION', payload)
        .then(() => {
          this.transitioned = true;
          this.requester();
        });
      }
    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    dialogOptionEmited: function(answerID, dialogID) {
      this.$store.dispatch('DIALOG_ANSWER', {answerID, dialogID});
    },
    setDialogVisibility() {
      this.$store.dispatch('LAYOUT_OPEN', 'dialog');
    },
    backToGames: function() {
      this.$router.push('games')
    },
  },
  watch: {
    "get_page.id": function(newVal, oldVal) {
      if( newVal != oldVal ){
        document.querySelector('.page-container').scrollTop = 0;
      }
    },
    get_page: function(newVal) {
      // Check if page has got timeLimit for transition trigger
      var timeForCounter;
      if( newVal.hasOwnProperty('timeLimit') ){
        if( this.get_pageTimer > 0 ){
          timeForCounter = this.get_pageTimer;
        }else{
          timeForCounter = newVal.timeLimit;
        }
        this.timerON = true;
        // timeForCounter = 3000;
        let callbackObject = {
          id: this.get_transitions[0].pageTransition.id,
          userTransition: false,
        }
        this.timerContainer = new Timer( timeForCounter,    // Transition time
          this.requestPageTransition,                       // Callback
          callbackObject);
        
        this.timerContainer.start();
      }
    },
    get_dialog: function(newVal) {
      if( this.get_layoutState.dialog.opened ) { return; }
      if( newVal.length > 0 && newVal[0].hasOwnProperty('receiveAfter') ){
        new Timer(newVal[0].receiveAfter, // Transition time
          this.setDialogVisibility,       // Callback
          true)                           // Callback payload
          .start();
      }
    },
  },
}

</script>