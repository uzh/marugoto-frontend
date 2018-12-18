<template>
  <div class="main-container">
    <h1 class="page-title">Login</h1>
    <br />
    <p class="page-title-paragraph">Please log in or create a new account to play the game:</p>
    <br />
    <InputField v-model="mail" typeProp="email" labelName="E-Mail" iconPosition="right" />
    <InputField v-model="password" typeProp="password" labelName="Password" />
    <br />
    <br />
    <Btn text="Login" primary="true" iconPosition="right" @click="login" />
    <br>
<<<<<<< HEAD
    <Btn text="Create Account" ghost="true" iconPosition="right" iconColor="secondary" @click="createAccount" />
=======
    <Btn text="Create Account" ghost="true" iconPosition="right" @click="createAccount" />
    <SvgIcon name="zoom-out" />
>>>>>>> fd713a64fa7abf322465bc8cd41aee4d530d8064
  </div>
</template>

<script>
import SvgIcon from '@/components/svgicon';

import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons'


export default {
  name: 'loginView',
  components: { SvgIcon, InputField, Btn },
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
