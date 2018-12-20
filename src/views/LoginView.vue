<template>
  <div class="main-container">
    <h1 class="page-title">Login</h1>
    <p class="page-title-paragraph">Please log in or create a new account to play the game:</p>
    <form @keydown.enter="login">
      <InputField v-model="mail" typeProp="email" labelName="E-Mail" />
      <InputField v-model="password" typeProp="password" labelName="Password" />
    </form>
    <br>
    <Btn text="Login" primary="true" iconPosition="right" @click.native="login" />
    <br>
    <Btn text="Create Account" ghost="true" iconPosition="right" />
    <UnorderedList :ul="list" />
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons';

import UnorderedList from '../components/lists/unorderedLists'

export default {
  name: 'loginView',
  components: { InputField, Btn, UnorderedList },
  data(){
    return{
      mail: '',
      password: '',
      list: [
        {
          name: 'David'
        },
        {
          name: 'Lee'
        }
      ]
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
