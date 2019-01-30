<template>
<div>
  <div class="col-xs-1"></div>
  <div class="main-container col-xs-6">
    <h1 class="page-title">Welcome to Lives in Transit!</h1>
    <p class="lead-text">Lives in Transit Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero alias accusantium earum atque eum incidunt, aut?</p>
    <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
  </div>
  <div class="col-xs-1"></div>
  <div class="main-container col-xs-4">
    <h1 class="page-title">Login</h1>
    <div
      class="lead choose-account"
      @click="accountType = 'university'">University Account
    </div>
    <div
      class="lead choose-account"
      @click="accountType = 'guest'">Guest Account
    </div>
    <!-- Guest Account Form -->
    <div v-if="accountType == 'guest'">
      <p class="lead">Account</p>
      <form @keydown.enter="login">
        <InputField v-model="mail" typeProp="email" labelName="E-Mail" />
        <InputField v-model="password" typeProp="password"
        labelName="Password" />
      </form>
      <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
      <p class="lead">I'm a first time User</p>
      <Btn @click.native="goToRegister" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>
    <!-- University Account Form -->
    <div v-if="accountType == 'university'">
      <p class="lead">Account</p>
      <SelectField required="true" labelName="Select University" :list="uniList" />
      <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
      <p class="lead">I'm a first time User</p>
      <SelectField required="true" labelName="Select University" :list="uniList" />
      <Btn @click.native="goToRegister" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>
  </div>
  <div class="origin-background"></div>
</div>
</template>

<script>

import { mapActions } from 'vuex';
import InputField from '@/components/01_atoms/inputs/text';
import Btn from '@/components/01_atoms/buttons';
import SelectField from '@/components/01_atoms/inputs/select';

export default {
  name: 'loginView',
  components: { InputField, Btn, SelectField },
  data(){
    return{
      mail: '',
      password: '',
      accountType: 'guest',
      uniList: [
        {
          name: 'UZH Frontend',
        },
        {
          name: 'UZH Backend',
        }
      ],
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
