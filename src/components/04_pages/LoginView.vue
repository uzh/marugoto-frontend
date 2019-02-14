<template>
<div>
  <div class="col-xs-1 rotated-text-login-page">
    <div class="item">Welcome</div>
    <div class="item disabled">Reviews</div>
    <div class="item disabled">Collaborations</div>
  </div>
  <div class="wrapper-container col-xs-6">
    <h1 class="page-title">Welcome to Lives in Transit!</h1>
    <p class="lead-text">Lives in Transit Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero alias accusantium earum atque eum incidunt, aut?</p>
    <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>    
  </div>
  <div class="col-xs-1"></div>
  <div class="wrapper-container col-xs-4">
    <h1 class="page-title">Login</h1>
    <div
      class="lead choose-account"
      :class="accountType == 'university' ? '' : 'opacity'"
      @click="accountType = 'university'">University Account
    </div>
    <div
      class="lead choose-account"
      :class="accountType == 'guest' ? '' : 'opacity'"
      @click="accountType = 'guest'">Guest Account
    </div>
    <!-- Guest Account Form -->
    <div v-show="accountType == 'guest'" class="mt-50">
      <p class="lead">Account</p>
      <form @keydown.enter="login">
        <InputField tabindex="-2" v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage" />
        <InputField tabindex="-1" v-model="password" typeProp="password" labelName="Password" :required="errorMessage" />
      </form>
      <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
      <p class="lead mt-30">I'm a first time User</p>
      <Btn @click.native="goToRegister" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>
    <!-- University Account Form -->
    <div v-show="accountType == 'university'" class="mt-50">
      <p class="lead">Account</p>
      <SelectField labelName="Select University" :required="errorMessage" :list="uniList" />
      <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
      <p class="lead mt-30">I'm a first time User</p>
      <SelectField labelName="Select University" :required="errorMessage" :list="uniList" />
      <Btn @click.native="goToRegister" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>
  </div>
  <div class="origin-background full-width">
    <div class="col-xs-10 col-xs-offset-1 login-page-bottom-icons">
      <div class="footer-logo">
        <!-- <SvgIcon name="blind" sizeH="20" iconPosition="left" class="logo" /> -->
        <div class="logo-caption">Universitat Zurich</div>
      </div>
      <div class="footer-menu-right">
        <div class="item">Datenschutz</div>
        <div class="item">Impressum</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { mapActions } from 'vuex';
import InputField from '@/components/01_atoms/inputs/text';
import Btn from '@/components/01_atoms/buttons';
import SelectField from '@/components/01_atoms/inputs/select';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'loginView',
  components: { InputField, Btn, SelectField, SvgIcon },
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
      errorMessage: false,
    }
  },
  computed: {
    logErrorMessage: function() {
      // eslint-disable-next-line
      return this.errorMessage = true;
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    login(){
      this.$store.dispatch('LOGIN', {
        mail: this.mail,
        password: this.password,
      }).then(() => this.$router.push('/'))
      .catch(() => this.logErrorMessage);
    },
    goToRegister(){
      this.$router.push('/register');
    },
  },
}

</script>
