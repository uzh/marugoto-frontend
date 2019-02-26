<template>
<div>
  <!-- Left menu -->
  <div class="col-xs-1 rotated-text-login-page">
    <p class="item">Welcome</p>
    <p class="item disabled">Reviews</p>
    <p class="item disabled">Collaborations</p>
  </div>
  <!-- Left Text -->
  <div class="wrapper-container col-xs-5">
    <h2 class="page-title mb-50">Welcome to Lives in Transit!</h2>
    <p>Lives in Transit Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero alias accusantium earum atque eum incidunt, aut?</p>
    <br>
    <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
    <br>
    <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
  </div>
  <!-- Empty columns -->
  <div class="col-xs-2"></div>
  <!-- Login Form -->
  <div class="wrapper-container col-xs-4">
    <h3 class="page-title mb-60">Login</h3>
    <div>
      <p class="lead choose-account"
        :class="accountType == 'university' ? '' : 'opacity'"
        @click="accountType = 'university'">University Account
      </p>
      <div class="middle-arrow"></div>
      <p class="lead choose-account"
        :class="accountType == 'guest' ? '' : 'opacity'"
        @click="accountType = 'guest'">Guest Account
      </p>
    </div>

    <!-- University Account Form -->
    <div v-show="accountType == 'university'" class="mt-40">
      <p class="lead mb-10">Account</p>
      <div>
        <SelectField labelName="Select University" :list="uniList" />
        <Btn text="Login" primary="true" iconName="arrow-right" iconColor="#979797" class="mb-40"/>
      </div>
      <p class="lead mt-30">I'm a first time User</p>
      <form class="mt-10">
        <SelectField labelName="Select University" :list="uniList" />
      </form>
      <Btn @click.native="goToRegister('university')" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>

    <!-- Guest Account Form -->
    <div v-show="accountType == 'guest'" class="mt-40">
      <p class="lead mb-10">Account</p>
      <div v-if="!enterNewPassword">
        <form @keydown.enter="login">
          <InputField tabindex="0" v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage || forgottenPassword" iconName="info" />
          <InputField tabindex="0" v-model="password" typeProp="password" labelName="Password" :required="errorMessage" />
        </form>
        <div v-if="errorText" class="login-error-message">{{ errorText }}</div>
        <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
        <Btn text="Forgot Password?" ghost="true" @click.native="forgotPassword" class="mt-10 mb-40" />
      </div>
      <!-- Enter New Password -->
      <div v-if="enterNewPassword">
        <form>
          <InputField tabindex="0" v-model="mail" typeProp="email" labelName="E-Mail" />
          <InputField tabindex="0" v-model="password" typeProp="password" labelName="Enter New Password" />
        </form>
        <Btn text="Login" primary="true" @click.native="login" iconName="arrow-right" iconColor="#979797" />
      </div>
      <p class="lead mt-30">I'm a first time User</p>
      <Btn @click.native="goToRegister('guest')" text="Create Account" ghost="true" iconName="arrow-right" iconColor="#979797" />
    </div>
  </div>
  <!-- Background Image/Footer menu -->
  <div class="origin-background full-width">
    <div class="col-xs-10 col-xs-offset-1 login-page-bottom-icons">
      <div class="footer-logo">
        <div class="logo"></div>
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
      uniList: [
        {
          name: 'UZH Frontend',
        },
        {
          name: 'UZH Backend',
        }
      ],
      accountType: 'guest',
      errorMessage: false,
      errorText: '',
      forgottenPassword: false,
      enterNewPassword: false,
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    login(){
      if ( this.mail == '' || this.password == '') {
        this.errorMessage = true;
        this.errorText = '';
      } else {
        this.$store.dispatch('LOGIN', {
          mail: this.mail,
          password: this.password,
        }).then(() => this.$router.push('/'))
        .catch((err) => {
          this.errorText = err.response.data.message;
          this.errorMessage = true
        });
      }
    },
    goToRegister(val){
      this.$router.push({ name: 'register', params: { type: val }});
    },
    forgotPassword(){
      this.errorMessage = false;
      if ( this.mail == '' ) {
        this.forgottenPassword = true;
      } else {
        this.$store.dispatch('FORGOT_PASSWORD', {
          email: this.mail,
          passwordResetUrl: 'http://localhost:8080/user/' + this.mail.split('@')[0],
        }).then((resp) => {
          alert('Please check your mail inbox.');
          this.$router.push({ name: 'test', params: { mail: this.mail, resetToken: resp.data.resetToken }})
        })
        .catch(() => {
          this.forgottenPassword = true;
        });
      }
    }
  },
}

</script>
