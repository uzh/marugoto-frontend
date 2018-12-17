<template>
  <div class="main-container">
    <h1 class="page-title">Login</h1>
    <br />
    <p class="page-title-paragraph">Please log in or create a new account to play the game:</p>
    <br />
    <InputField v-model="mail" typeProp="email" labelName="E-Mail" iconPosition="right" />
    <InputField v-model="password" typeProp="password" labelName="Password" />
    <br>
    <Btn text="Login" primary="true" iconPosition="right" @click="login" />
    <br>
    <Btn text="Create Account" ghost="true" iconPosition="right" iconColor="secondary" @click="createAccount" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons'

export default {
  name: 'loginView',
  components: { InputField, Btn },
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
      }).then(() => this.$router.push('/'));
    },
  },
}

</script>
