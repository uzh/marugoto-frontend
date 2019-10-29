<template>
<div>
  <div class="login-container">
    <!-- Left main container -->
    <div class="left-container">
      <div class="left-container-div">
        <!-- Left menu -->
        <div class="left-container-menu">
          <div class="item" :class="selectedTab == 'welcome' ? 'focused' : ''" @click="selectedTab = 'welcome'" @focus="selectedTab = 'welcome'" tabindex="0">
            Welcome
          </div>
          <div class="item" :class="selectedTab == 'partners' ? 'focused' : ''" @click="selectedTab = 'partners'" @focus="selectedTab = 'partners'" tabindex="0">
            Partners
          </div>
          <div class="item" :class="selectedTab == 'reviews' ? 'focused' : ''" @click="selectedTab = 'reviews'" @focus="selectedTab = 'reviews'" tabindex="0">
            Reviews
          </div>
          <div class="item" :class="selectedTab == 'citing' ? 'focused' : ''" @click="selectedTab = 'citing'" @focus="selectedTab = 'citing'" tabindex="0">
            Citing LiT
          </div>
        </div>
        <!-- Left Text -->
        <div class="wrapper-container-left">
          <Welcome v-show="selectedTab == 'welcome'"/>
          <Reviews v-show="selectedTab == 'reviews'"/>
          <Partners v-show="selectedTab == 'partners'"/>
          <Citing v-show="selectedTab == 'citing'"/>
          <Agreement v-show="selectedTab == 'agreement'"/>
        </div>
      </div>
    </div>
    <!-- Right main container -->
    <div class="right-container">
      <!-- Login Form -->
      <div class="wrapper-container-right">
        <h3 class="page-title mb-60">Login</h3>
        <div class="choose-account clearfix">
          <div 
            v-if="!shibEnabled"
            class="account block-left" 
            :class="accountType == 'university' ? '' : 'text-darker'" 
            @click="accountType = 'university'" 
            @focus="accountType = 'university'" 
            tabindex="0">University Account
          </div>
          <div class="middle-arrow"></div>
          <div 
            class="account block-right" 
            :class="accountType == 'guest' ? '' : 'text-darker'" 
            @click="accountType = 'guest'" 
            @focus="accountType = 'guest'" 
            tabindex="0">Guest Account
          </div>
        </div>

        <!-- University Account Form -->
        <div 
          v-if="!shibEnabled"
          v-show="accountType == 'university'"
          class="mt-40">
          <p class="lead mb-10">Account</p>
          <div>
            <SelectField labelName="Select University" :list="uniList" />
            <Btn text="Login" primary="true" class="mb-40"/>
          </div>
          <p class="lead mt-30 mb-10">I'm first time User</p>
          <form class="mt-10">
            <SelectField labelName="Select University" :list="uniList" />
          </form>
          <Btn @click.native="goToRegister('university')" text="Create new account" ghost="true" />
        </div>

        <!-- Guest Account Form -->
        <div v-show="accountType == 'guest'" class="mt-40">
          <p class="lead mb-10">Account</p>
          <div>
            <form @keydown.enter="login">
              <InputField 
                inputName="loginMail"
                v-model="mail" 
                typeProp="email" 
                labelName="E-Mail" 
                :required="errorMessage || forgottenPassword" />
              <InputField  
                inputName="loginPassword"
                v-model="password" 
                typeProp="password" 
                labelName="Password" 
                :required="errorMessage" />
            </form>
            <div v-if="errorText" class="login-error-message">{{ errorText }}</div>
            <div v-if="successText" class="login-success-message">{{ successText }}</div>
            <Btn text="Login" primary="true" @click.native="login" />
            <Btn text="Forgot Password?" ghost="true" @click.native="forgotPassword" class="mt-10 mb-40" />
          </div>
          <p class="lead mt-30 mb-10">I'm a first time User</p>
          <Btn @click.native="goToRegister('guest')" text="Create Account" ghost="true" />
        </div>
      </div>
    </div>
  </div>
  <!-- Background Image/Footer menu -->
  <div class="origin-background">
    <div class="col-xs-10 col-xs-offset-1 login-page-bottom-icons">
      <div class="footer-logo">
        <div class="logo"></div>
      </div>
      <div class="footer-menu-right font-secondary">
        <div 
          class="item" 
          :class="selectedTab == 'agreement' ? 'focused' : ''" 
          @click="selectedTab = 'agreement'" 
          @focus="selectedTab = 'agreement'" 
          tabindex="0">
          Data use agreement
        </div>
        <a class="item" href="https://twitter.com/TransitLives" target="_blank">Twitter</a>
        <a class="item" href="https://github.com/uzh/marugoto" target="_blank">Github</a>
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
import Welcome from '@/components/00_static/welcome';
import Agreement from '@/components/00_static/agreement';
import Citing from '@/components/00_static/citing';
import Reviews from '@/components/00_static/reviews';
import Partners from '@/components/00_static/partners';

export default {
  name: 'loginView',
  components: { InputField, Btn, SelectField, SvgIcon, Welcome, Agreement, Citing, Reviews, Partners },
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
      successText: '',
      forgottenPassword: false,
      selectedTab: 'welcome',
      shibEnabled: process.env.VUE_APP_ENABLE_SHIB,
    }
  },
  methods: {
    mounted() {
    },
    ...mapActions(['LOGIN']),
    login(){
      if ( this.mail == '' && this.password == '') {
        this.errorMessage = true;
        this.errorText = 'Please enter your E-Mail and Password.';
      } else if ( this.mail == '') {
        this.errorMessage = true;
        this.errorText = 'Please enter your E-Mail.';
      } else if ( this.password == '') {
        this.errorMessage = true;
        this.errorText = 'Please enter your Password.';
      } else {
        this.$store.dispatch('LOGIN', {
          mail: this.mail,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/games')
        })
        .catch(() => {
          this.errorText = "Your E-Mail or Password are incorrect.";
          this.errorMessage = true;
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
        this.errorText = 'Please enter your E-Mail, so that we can send you the link to reset your password.';
      } else {
        this.$store.dispatch('FORGOT_PASSWORD', {
          email: this.mail,
          passwordResetUrl: `${process.env.VUE_APP_LOCAL_PATH}reset`,
        }).then(() => {
          this.errorText = '';
          this.successText = `
            We’ve sent an email to ${this.mail}. Click the link in the email to reset your password.
          
            If you don’t see the email, check other places it might be, like your junk, spam, social, or other folders.
          `;
        })
        .catch(err => {
          if(err.response.data.errorList.email) {
            this.errorText = err.response.data.errorList.email;
          } else {
            this.errorText = err.response.data.message;
          }
          this.forgottenPassword = true;
        });
      }
    },
  },
}

</script>
