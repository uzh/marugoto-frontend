<template>
  <div class="main-container">
    <div class="storyline-container col-xs-12" v-if="get_topic.selected">
      <div class="storyline-title col-xs-12">
        <div class="page-title-icon-container col-xs-2"> 
          <img v-if="get_page.chapter.icon && get_page.chapter.icon.path" class="icon" :src="`${resourcesPath}${get_page.chapter.icon.path}`">
        </div>
        <vue-markdown class="page-title" :source="get_page.title" />
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
      'get_textExerciseExists' ]),
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
      this.$store.dispatch('UPDATE_NOTEBOOK');
    },
    requestPageTransition(id){
      if( this.get_textExerciseExists.exist ){
        // Here you can prevent to make transition if exercise is required but empty or 
        // grab exercise value before transition and update backend first
        this.$store.dispatch('SUBMIT_EXERCISE_STATE', {
          id: this.get_textExerciseExists.state.id,
          answer: document.getElementById(this.get_textExerciseExists.state.id).value,
        })
        .then(() => {
          this.$store.dispatch('REQUEST_PAGE_TRANSITION', id)
          .then(() => {
            this.$store.dispatch('LAYOUT_OPEN');
            this.requester();
          });
        })
      }else{
        this.$store.dispatch('REQUEST_PAGE_TRANSITION', id)
        .then(() => {
          this.$store.dispatch('LAYOUT_OPEN');
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
  },
  watch: {
    get_page: function(newVal, oldVal) {
      if( newVal != oldVal ){
        document.querySelector('.page-container').scrollTop = 0;
      }

      // Check if page has got timeLimit for transition trigger
      if( newVal.hasOwnProperty('timeLimit') ){
        new Timer(newVal.timeLimit,                   // Transition time
          this.requestPageTransition,                 // Callback
          this.get_transitions[0].pageTransition.id)  // Callback payload
          .start();
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