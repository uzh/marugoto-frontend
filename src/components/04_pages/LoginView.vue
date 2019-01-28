<template>
<div>
  <div class="main-container">
    <h1 class="page-title col-xs-10 col-xs-offset-1">Welcome to Lives in Transit!</h1>
    <p class="lead-text col-xs-10 col-xs-offset-1">Lives in Transit Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero alias accusantium earum atque eum incidunt, aut?</p>
    <p class="col-xs-10 col-xs-offset-1">As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
  </div>
  <div class="main-container">
    <h1 class="page-title col-xs-12">Login</h1>
    <p class="lead col-xs-6">University Account</p><p class="lead col-xs-6">Guest Account</p>
    <p class="lead col-xs-12">Account</p>
    <form class="col-xs-12" @keydown.enter="login">
      <InputField v-model="mail" typeProp="email" labelName="E-Mail" />
      <InputField v-model="password" typeProp="password"
      labelName="Password" />
    </form>
    <Btn class="col-xs-12" text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
    <p class="lead">I'm a first time User</p>
    <Btn class="col-xs-12" @click.native="goToRegister" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
  </div>
  <div class="origin-background"></div>
</div>
</template>

<script>

import { mapActions } from 'vuex';
import InputField from '@/components/01_atoms/inputs/text';
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
