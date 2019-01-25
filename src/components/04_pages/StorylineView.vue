<template>
  <div>
    <!-- <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/> -->
    <div v-if="!get_topic.selected">
      <div v-for="(topic, index) in get_topic.list" :key="index">
        <p @click="chooseTopic(topic.id)">{{ topic.title }}</p>
      </div>
    </div>
    <div v-if="get_topic.selected">
      <h1>{{ get_page.title }}</h1>
      <!-- Components -->
      <PageComponents />
      <!-- Page transitions -->
      <PageTransitions @transitionChoosen="requestPageTransition" />
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

export default {
  name: 'player',
  components: { Btn, PageTransitions, PageComponents },
  computed: {
    ...mapGetters([ 'get_page', 'get_topic' ]),
  },
  created() {
    if( !this.get_topic.selected ){
      this.$store.dispatch('UPDATE_TOPIC_LIST');
    }else{
      this.$store.dispatch('REQUEST_PAGE_CURRENT');
      apiService.get('notebook/list')
      .then(resp => {
        this.$store.dispatch('UPDATE_NOTEBOOK', resp.data);
      })
      .catch(err => {});
    }
  },
  methods: {
    ...mapActions(['LOGOUT']),
    chooseTopic: function(id){
      this.$store.dispatch('CHOOSE_TOPIC', id)
      .then(() => {
        this.$store.dispatch('REQUEST_PAGE_CURRENT');
      });
    },
    requestPageTransition(id){
      this.$store.dispatch('REQUEST_PAGE_TRANSITION', id);
      apiService.get('notebook/list')
      .then(resp => {
        this.$store.dispatch('UPDATE_NOTEBOOK', resp.data);
      })
      .catch(err => {});
    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
  },
}

</script>