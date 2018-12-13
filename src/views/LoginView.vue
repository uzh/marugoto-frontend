<template>
  <div>
    <h1>Log in</h1>
    <label>Email</label>
    <input v-model="mail" type="email" placeholder="Name"/>
    <label>Password</label>
    <input v-model="password" type="password" placeholder="Password"/>
    <hr/>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'loginView',
  data(){
    return{
      mail: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    login(){
      this.$store.dispatch('LOGIN', {
        mail: this.mail,
        password: this.password,
      }).then(resp => this.$router.push('/'));
    },
  },
}

</script>
