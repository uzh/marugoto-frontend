<template>
  <div>
    <h1>Login</h1>
    <p>Please log in or create a new account to play the game:</p>
    <form @keydown.enter="login">
      <InputField v-model="mail" typeProp="email" labelName="E-Mail" />
      <InputField v-model="password" typeProp="password" labelName="Password" />
    </form>
    <br>
    <Btn text="Login" primary="true" iconPosition="right" @click.native="login" />
    <br>
    <Btn text="Create Account" ghost="true" iconPosition="right" />
    <SVGIcon name="inbox-message" />
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons'

import SVGIcon from '@/components/svgicon'


export default {
  name: 'loginView',
  components: { InputField, Btn, SVGIcon},
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
