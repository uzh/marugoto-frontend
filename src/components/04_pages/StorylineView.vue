<template>
  <div class="storyline-container">
    <!-- <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/> -->
    <div>
      <div class="col-xs-1"></div>
      <div class="col-xs-10">
        <div v-if="!get_topic.selected">
          <TopicComponent :list="get_topic.list" @openTopic="chooseTopic" />
        </div>
        <div v-if="get_topic.selected">
          <h1 class="storyline-title">{{ get_page.title }}</h1>
          <!-- Components -->
          <PageComponents />
          <!-- Page transitions -->
          <PageTransitions @transitionChoosen="requestPageTransition" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'
import apiService from '@/apiService'

import Btn from '@/components/01_atoms/buttons'
import PageTransitions from '@/components/02_molecules/pageTransitions'
import PageComponents from '@/components/02_molecules/pageComponents'

import TopicComponent from '@/components/02_molecules/pageComponents/topic'

export default {
  name: 'player',
  components: { Btn, PageTransitions, PageComponents, TopicComponent },
  computed: {
    ...mapGetters([ 'get_page', 'get_topic' ]),
  },
  created() {
    if( !this.get_topic.selected ){
      this.$store.dispatch('UPDATE_TOPIC_LIST');
    }else{
      this.$store.dispatch('REQUEST_PAGE_CURRENT');
      this.$store.dispatch('UPDATE_NOTEBOOK');
      this.$store.dispatch('MAIL_LIST_UPDATE');
    }
  },
  methods: {
    chooseTopic: function(id){
      this.$store.dispatch('CHOOSE_TOPIC', id)
      .then(() => {
        this.$store.dispatch('REQUEST_PAGE_CURRENT');
        this.$store.dispatch('UPDATE_NOTEBOOK');
        this.$store.dispatch('MAIL_LIST_UPDATE');
      });
    },
    requestPageTransition(id){
      this.$store.dispatch('REQUEST_PAGE_TRANSITION', id);
      this.$store.dispatch('UPDATE_NOTEBOOK');
      this.$store.dispatch('MAIL_LIST_UPDATE');
    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
  },
}

</script>