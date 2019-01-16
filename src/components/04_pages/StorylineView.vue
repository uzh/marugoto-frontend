<template>
  <div>
    <!-- <Btn @click.native="logout" text="Logout" primary="true" iconName="arrow-right"/> -->
    <h1>{{ pageTitle }}</h1>
    <!-- Other components / until merge with exercises / text, image, video -->
    <div v-for="(item, index) in componentsList" :key="index">
      {{ item.markdownContent }}
    </div>

    <!-- Components -->
    <Exercise :exercises="exerciseList" @emitStatesChanged="stateChanged" />
    <!-- Page transitions -->
    <PageTransitions 
      @transitionChoosen="request"
      :optionsList="transitionsOptions" />
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'
import apiService from '@/apiService'

import Btn from '@/components/01_atoms/buttons'
import PageTransitions from '@/components/02_molecules/pageTransitions'
import Exercise from '@/components/02_molecules/exercise'

export default {
  name: 'player',
  components: { Btn, PageTransitions, Exercise },
  data() {
    return{
      pageTitle: '',
      transitionsOptions: [],
      exerciseList: [],
      componentsList: [],
    }
  },
  created() {
    apiService.get('/pages/current')
      .then(resp => {
        this.transitionsOptions = this.generateTransitionList(resp.data.pageTransitionStates);
        this.componentsList = resp.data.page.components;

        if( resp.data.exerciseStates.length > 0 ) {
          this.exerciseList = resp.data.exerciseStates;
        }
        this.pageTitle = resp.data.page.title;
        console.log('transitionsOptions')
    console.log(this.transitionsOptions)
    console.log('exerciseList')
    console.log(this.exerciseList)
    console.log('componentsList')
    console.log(this.componentsList)
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
    stateChanged(){

    },
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    request(id){
      apiService.post('pageTransitions/doPageTransition/' + id + '?chosenByPlayer=true')
      .then(resp => {
        this.transitionsOptions = this.generateTransitionList(resp.data.pageTransitionStates);
        this.componentsList = resp.data.components;

        if( resp.data.exerciseStates ) {
          this.exerciseList = resp.data.page.exerciseStates;
        }
        this.pageTitle = resp.data.page.title;

        console.log('transitionsOptions')
    console.log(this.transitionsOptions)
    console.log('exerciseList')
    console.log(this.exerciseList)
    console.log('componentsList')
    console.log(this.componentsList)
      })
      .catch(() => {
        
      });
    }
  },
}

</script>