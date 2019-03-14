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
          <div class="item" :class="selectedTab == 'reviews' ? 'focused' : ''" @click="selectedTab = 'reviews'" @focus="selectedTab = 'reviews'" tabindex="0">
            Reviews
          </div>
          <div class="item" :class="selectedTab == 'collaborations' ? 'focused' : ''" @click="selectedTab = 'collaborations'" @focus="selectedTab = 'collaborations'" tabindex="0">
            Collaborations
          </div>
          <div class="item" :class="selectedTab == 'quotes' ? 'focused' : ''" @click="selectedTab = 'quotes'" @focus="selectedTab = 'quotes'" tabindex="0">
            Quotes LiT
          </div>
        </div>
        <!-- Left Text -->
        <div class="wrapper-container-left">
          <div v-show="selectedTab == 'welcome'">
            <h2 class="page-title mb-50">Welcome to Lives in Transit!</h2>
            <p>Lives in Transit is a <strong>text-based adventure game</strong> (in the words of one player). Or, to keep things respectably academic, it is an interactive E-learning tool which simulates the experience of researching and writing global history.</p>
            <br>
            <p>As a player, you will adopt the role of a university graduate student, choose a research topic, and work through a challenging set of storylines. You’ll collect real historical sources along the way and create a record of how your thinking changes during research. As a teacher, you can set your students to play in class, mapping their progress—and their frustrations—through the different storylines.</p>
            <br>
            <p>Like this historical map of Japan’s Yamashiro province, your research landscape will change as you decide which road you’ll take. So: get lost (as it were). We hope you learn and have fun.</p>
            <br>
            <p>The LiT Team, University of Zurich</p>
          </div>
          <div v-show="selectedTab == 'reviews'">
            <h2 class="page-title mb-50">Reviews</h2>
            <p>This is Reviews page.</p>
          </div>
          <div v-show="selectedTab == 'collaborations'">
            <h2 class="page-title mb-50">Collaborations</h2>
            <p>This is Collaborations page.</p>
          </div>
          <div v-show="selectedTab == 'quotes'">
            <h2 class="page-title mb-50">Quotes LiT</h2>
            <p>This is Quotes LiT page.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Right main container -->
    <div class="right-container">
      <!-- Login Form -->
      <div class="wrapper-container-right">
        <h3 class="page-title mb-60">Login</h3>
        <div class="choose-account">
          <div class="account" :class="accountType == 'university' ? '' : 'text-darker'" @click="accountType = 'university'" @focus="accountType = 'university'" tabindex="0">University Account
          </div>
          <div class="middle-arrow"></div>
          <div class="account" :class="accountType == 'guest' ? '' : 'text-darker'" @click="accountType = 'guest'" @focus="accountType = 'guest'" tabindex="0">Guest Account
          </div>
        </div>

        <!-- University Account Form -->
        <div v-show="accountType == 'university'" class="mt-40">
          <p class="lead mb-10">Account</p>
          <div>
            <SelectField labelName="Select University" :list="uniList" />
            <Btn text="Login" primary="true" class="mb-40"/>
          </div>
          <p class="lead mt-30">I'm first time User</p>
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
              <InputField tabindex="-1" v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage || forgottenPassword" />
              <InputField tabindex="-2" v-model="password" typeProp="password" labelName="Password" :required="errorMessage" />
            </form>
            <div v-if="errorText" class="login-error-message">{{ errorText }}</div>
            <div v-if="successText" class="login-success-message">{{ successText }}</div>
            <Btn text="Login" primary="true" @click.native="login" />
            <Btn text="Forgot Password?" ghost="true" @click.native="forgotPassword" class="mt-10 mb-40" />
          </div>
          <p class="lead mt-30">I'm a first time User</p>
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
      <div class="footer-menu-right">
        <div class="item" tabindex="0">Disclaimer</div>
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
      successText: '',
      forgottenPassword: false,
      selectedTab: 'welcome',
    }
  },
  methods: {
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
          this.$router.push('/')
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
        .catch(() => {
          this.forgottenPassword = true;
        });
      }
    },
  },
}

</script>
