<template>
  <div>
    <h1>Storyline view</h1>
    <Btn @click.native="logout" text="Logout" primary="true"/>
    <Btn @click.native="request" text="make request" secondary="true"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Btn from '@/components/buttons'
import apiService from '@/apiService'

export default {
  name: 'player',
  components: { Btn },
  methods: {
     ...mapActions(['LOGOUT']),
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    request(){
      console.log('MAke request')
      apiService.get('/pages/current')
        .then(resp => {
          console.log(resp)
        })
        .catch(err => {
          console.log(err)
        });
    }
  },
}

</script>
