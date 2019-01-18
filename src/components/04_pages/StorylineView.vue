<template>
  <div>
    <!-- <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/> -->
    <h1>{{ pageTitle }}</h1>
    <!-- Components -->
    <PageComponents @emitStatesChanged="stateChanged" />
    <!-- Page transitions -->
    <PageTransitions @transitionChoosen="request" />
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'
import apiService from '@/apiService'

import Btn from '@/components/01_atoms/buttons'
import PageTransitions from '@/components/02_molecules/pageTransitions'
import PageComponents from '@/components/02_molecules/pageComponents'

export default {
  name: 'player',
  components: { Btn, PageTransitions, PageComponents },
  data() {
    return{
      pageTitle: '',
    }
  },
  created() {
    this.$store.dispatch('REQUEST_PAGE_CURRENT');
  },
  methods: {
    ...mapActions(['LOGOUT']),
    generateTransitionList(list) {
      const newArr = list.map( listItem => {
        return{
          id: listItem.pageTransition.id,
          buttonText: listItem.pageTransition.buttonText,
          available: listItem.available,
        }
      });
      return newArr;
    },
    stateChanged(){

    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    request(id){
      //this.$store.dispatch('REQUEST_PAGE_TRANSITION', id);
    }
  },
}

</script>