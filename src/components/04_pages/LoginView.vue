<template>
<div>
  <!-- Left menu -->
  <div class="col-xs-1 rotated-text-login-page">
    <div class="item">Welcome</div>
    <div class="item disabled">Reviews</div>
    <div class="item disabled">Collaborations</div>
  </div>
  <!-- Left Text -->
  <div class="wrapper-container col-xs-5">
    <h1 class="page-title">Welcome to Lives in Transit!</h1>
    <p class="lead-text">Lives in Transit Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero alias accusantium earum atque eum incidunt, aut?</p>
    <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
  </div>
  <!-- Empty column -->
  <div class="col-xs-1"></div>
  <!-- Empty column -->
  <div class="col-xs-1">
    <SvgIcon v-if="passwordForgotten" @click.native="goBack" name="arrow-left" sizeH="20" class="back-to-login" />
  </div>
  <!-- Login Form -->
  <div class="wrapper-container col-xs-4">
    <h1 class="page-title">Login</h1>
    <div
      class="lead choose-account"
      :class="accountType == 'university' ? '' : 'opacity'"
      @click="accountType = 'university'; errorLoginMessage = false; errorRegisterMessage = false;">University Account
    </div>
    <div
      class="lead choose-account"
      :class="accountType == 'guest' ? '' : 'opacity'"
      @click="accountType = 'guest'; errorLoginMessage = false; errorRegisterMessage = false;">Guest Account
    </div>

    <!-- University Account Form -->
    <div v-show="accountType == 'university'" class="mt-50">
      <p class="lead">Account</p>
      <div v-show="!passwordForgotten">
        <SelectField labelName="Select University" :required="errorLoginMessage" :list="uniList" />
        <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
        <Btn v-if="!passwordForgotten" class="mt-10" text="Forgot Password?" ghost="true" @click.native="passwordForgotten = true; errorLoginMessage = false; errorRegisterMessage = false;" iconName="arrow-right" iconColor="#979797" />
      </div>

      <!-- If Password Forgotten -->
      <div v-if="passwordForgotten">
        <form class="mt-10">
          <InputField tabindex="-2" v-model="mail" typeProp="email" labelName="E-Mail" :required="errorLoginMessage" />
          <InputField tabindex="-1" v-model="newPassword" typeProp="password" labelName="New Password" :required="errorLoginMessage" />
        </form>
        <Btn class="mt-10" text="Reset Password" ghost="true" @click.native="resetPassword" iconName="arrow-right" iconColor="#979797" />
      </div>

      <p class="lead mt-30">I'm a first time User</p>
      <form class="mt-10">
        <SelectField labelName="Select University" :required="errorRegisterMessage" :list="uniList" />
      </form>
      <Btn @click.native="goToRegister('university')" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>

    <!-- Guest Account Form -->
    <div v-show="accountType == 'guest'" class="mt-50">
      <p class="lead">Account</p>
      <div v-show="!passwordForgotten">
        <form @keydown.enter="login">
          <InputField tabindex="-2" v-model="mail" typeProp="email" labelName="E-Mail" :required="errorLoginMessage" />
          <InputField tabindex="-1" v-model="password" typeProp="password" labelName="Password" :required="errorLoginMessage" />
        </form>
        <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
        <Btn v-show="!passwordForgotten" class="mt-10" text="Forgot Password?" ghost="true" @click.native="passwordForgotten = true; errorLoginMessage = false; errorRegisterMessage = false;" iconName="arrow-right" iconColor="#979797" />
      </div>

      <!-- If Password Forgotten -->
      <div v-if="passwordForgotten">
        <form class="mt-10">
          <InputField tabindex="-2" v-model="mail" typeProp="email" labelName="E-Mail" :required="errorLoginMessage" />
          <InputField tabindex="-1" v-model="newPassword" typeProp="password" labelName="New Password" :required="errorLoginMessage" />
        </form>
        <Btn class="mt-10" text="Reset Password" ghost="true" @click.native="resetPassword" iconName="arrow-right" iconColor="#979797" />
      </div>
      
      <p class="lead mt-30">I'm a first time User</p>
      <Btn @click.native="goToRegister('guest')" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>
  </div>
  <!-- Background Image/Footer menu -->
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
      newPassword: '',
      uniList: [
        {
          name: 'UZH Frontend',
        },
        {
          name: 'UZH Backend',
        }
      ],
      accountType: 'guest',
      errorLoginMessage: false,
      errorRegisterMessage: false,
      passwordForgotten: false,
    }
  },
  computed: {
    logErrorLoginMessage: function() {
      // eslint-disable-next-line
      return this.errorLoginMessage = true;
    },
    logErrorRegisterMessage: function() {
      // eslint-disable-next-line
      return this.errorRegisterMessage = true;
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    login(){
      this.$store.dispatch('LOGIN', {
        mail: this.mail,
        password: this.password,
      }).then(() => this.$router.push('/'))
      .catch(() => this.logErrorLoginMessage);
    },
    goToRegister(val){
      this.$router.push({ name: 'register', params: { type: val }});
    },
    goBack(){
      this.passwordForgotten = false;
    },
    resetPassword(){
      const newPass = this.newPassword;
      const userEmail = this.mail;
      this.$store.dispatch('FORGOT_PASSWORD', {
        email: userEmail,
        newPassword: newPass,
        passwordResetUrl: 'string',
      }).then((resp) => {
        const token = resp.data.resetToken;
        const newPassword = newPass;
        const payload = {newPassword, token, userEmail};
        this.$store.dispatch('RESET_PASSWORD', payload)
        .then(() => {
          const mail = userEmail;
          const password = newPass;
          const payload = {mail, password};
          this.$store.dispatch('LOGIN', payload)
          .then(() => this.$router.push('/'))
        })
      });
    }
  },
}

</script>
