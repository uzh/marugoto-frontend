<template>
  <div>
    <h1>Storyline view</h1>
    <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/>
    <h1>{{ pageTitle }}</h1>
    <PageTransitions 
      @transitionChoosen="request"
      :buttonsList="transitionsOptions" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import apiService from '@/apiService'

import Btn from '@/components/01_atoms/buttons'
import PageTransitions from '@/components/02_molecules/pageTransitions'

export default {
  name: 'player',
  components: { Btn, PageTransitions },
  data() {
    return{
      pageTitle: '',
      transitionsOptions: [],
    }
  },
  created() {
    apiService.get('/pages/current')
      .then(resp => {
        this.transitionsOptions = this.generateTransitionList(resp.data.pageTransitionStates)
        this.pageTitle = resp.data.page.title;
      })
      .catch(() => {
        
      });
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
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    request(id){
      apiService.post('pageTransitions/doPageTransition/' + id + '?chosenByPlayer=true')
      .then(resp => {
        this.transitionsOptions = this.generateTransitionList(resp.data.pageTransitionStates);
        this.pageTitle = resp.data.page.title;
      })
      .catch(() => {
        
      });
    }
  },
}

</script>