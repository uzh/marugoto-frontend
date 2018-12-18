<template>
  <div>
    <h1>Storyline view</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'player',
  methods: {
     ...mapActions(['LOGOUT']),
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    }
  },
}

</script>
