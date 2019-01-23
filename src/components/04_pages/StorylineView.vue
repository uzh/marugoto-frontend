<template>
  <div>
    <!-- <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/> -->
    <h1>{{ get_page.title }}</h1>
    <!-- Components -->
    <PageComponents />
    <!-- Page transitions -->
    <PageTransitions @transitionChoosen="requestPageTransition" />
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
  created() {
    this.$store.dispatch('REQUEST_PAGE_CURRENT');
  },
  computed: {
    ...mapGetters([ 'get_page' ]),
  },
  methods: {
    ...mapActions(['LOGOUT']),
    requestPageTransition(id){
      this.$store.dispatch('REQUEST_PAGE_TRANSITION', id);
    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
  },
}

</script>