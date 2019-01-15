<template>
  <div class="main-container">
    <h1 class="page-title">Login</h1>
    <p class="page-title-paragraph">Please log in or create a new account to play the game:</p>
    <form @keydown.enter="login">
      <InputField v-model="mail" typeProp="email" labelName="E-Mail" />
      <InputField v-model="password" typeProp="password" labelName="Password" />
    </form>
    <br>
    <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" />
    <br>
    <Btn @click.native="goToRegister" text="Create Account" ghost="true" iconName="arrow-right" />
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import InputField from '@/components/01_atoms/inputs';
import Btn from '@/components/01_atoms/buttons';

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
    goToRegister(){
      this.$router.push('/register');
    },
  },
}

</script>
