<template>
  <div class="main-container">
    <!-- <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/> -->
    <TopicComponent v-if="!get_topic.selected" :list="get_topic.list" @openTopic="chooseTopic" />
    <div class="storyline-container" v-if="get_topic.selected">
      <vue-markdown class="storyline-title col-xs-10 col-xs-offset-1 mb-40 mt-30 markdown-h1" :source="get_page.title" />
      <!-- Components -->
      <PageComponents />
      <!-- Page transitions -->
      <PageTransitions @transitionChoosen="requestPageTransition" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import apiService from '@/apiService';
import Btn from '@/components/01_atoms/buttons';
import PageTransitions from '@/components/02_molecules/pageTransitions';
import PageComponents from '@/components/02_molecules/pageComponents';
import TopicComponent from '@/components/02_molecules/pageComponents/topic';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'player',
  components: { Btn, PageTransitions, PageComponents, TopicComponent, VueMarkdown },
  computed: {
    ...mapGetters([ 'get_page', 'get_topic' ]),
  },
  created() {
    if( !this.get_topic.selected ){
      this.$store.dispatch('UPDATE_TOPIC_LIST');
    }else{
      this.$store.dispatch('REQUEST_PAGE_CURRENT');
      this.requester();
    };
    
  },
  methods: {
    requester: function() {
      // Request notebook & mail lists
      this.$store.dispatch('UPDATE_NOTEBOOK');
      this.$store.dispatch('MAIL_LIST_UPDATE');
    },
    chooseTopic: function(id){
      this.$store.dispatch('CHOOSE_TOPIC', id)
      .then(() => {
        this.$store.dispatch('REQUEST_PAGE_CURRENT');
        this.requester();
      });
    },
    requestPageTransition(id){
      this.$store.dispatch('REQUEST_PAGE_TRANSITION', id);
      this.requester();
    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    }
  },
  watch: {
    get_page: function(oldVal, newVal) {
      if( newVal != oldVal ){
        document.querySelector('.page-container').scrollTop = 0;
      }
    },
  },
}

</script>