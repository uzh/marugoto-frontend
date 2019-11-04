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
          <div class="item" :class="selectedTab == 'about' ? 'focused' : ''" @click="selectedTab = 'about'" @focus="selectedTab = 'about'" tabindex="0">
            About
          </div>
          <div class="item" :class="selectedTab == 'faq' ? 'focused' : ''" @click="selectedTab = 'faq'" @focus="selectedTab = 'faq'" tabindex="0">
            FAQs
          </div>
        </div>
        <!-- Left Text -->
        <div class="wrapper-container-left">
          <Welcome v-show="selectedTab == 'welcome'"/>
          <Reviews v-show="selectedTab == 'reviews'"/>
          <Partners v-show="selectedTab == 'partners'"/>
          <Citing v-show="selectedTab == 'citing'"/>
          <Agreement v-show="selectedTab == 'agreement'"/>
          <About v-show="selectedTab == 'about'"/>
          <FAQs v-show="selectedTab == 'faq'"/>
        </div>
      </div>
    </div>
    <!-- Right main container -->
    <div class="right-container">
      <!-- Arrow column -->
      <div class="login-arrow">
        <SvgIcon 
          @click.native="goToLogin" 
          name="arrow-left" 
          customColor="#8C8B89" 
          class="back-to-login" />
      </div>
      <!-- Register Form -->
      <div class="wrapper-container-right">
        <!-- From Guest Account -->
        <div v-show="accountType == 'guest'">
          <h3 class="page-title mb-60">Create LiT Account</h3>
          <p class="lead mb-10">Enter your Data</p>
          <div>
            <form class="full-width" @keydown.enter="register">
              <InputField 
                autocomplete="off"
                inputName="registerFirstName" 
                v-model="firstName" 
                labelName="Name / Pseudonym" 
                :required="errorMessage" />
              <InputField 
                autocomplete="off"
                inputName="registerLastName" 
                v-model="lastName" 
                labelName="Lastname / Pseudonym" 
                :required="errorMessage" />
              <!--<SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />-->
              <InputField 
                autocomplete="off"
                inputName="registerEmail" 
                v-model="mail" 
                typeProp="email" 
                labelName="E-Mail" 
                :required="errorMessage" />
              <InputField 
                autocomplete="off"
                inputName="registerPassword" 
                v-model="password" 
                typeProp="password" 
                labelName="Password"
                :required="errorMessage"/>
              <p class="lead mb-10">Answer this question to prove you are human</p>
              <InputField
                v-model="answer"
                autocomplete="off"
                inputName="answer" 
                :labelName="question"
                :required="errorMessage"/>
            </form>
            <div v-if="errorText" class="login-error-message">
              <p>{{ errorText.text }}</p>
              <p v-if="errorText.errorList.mail">- {{ errorText.errorList.mail }}</p>
              <p v-if="errorText.errorList.password">- {{ errorText.errorList.password }}</p>
            </div>
            <Btn class="mt-30" @click.native="register" text="Create Account" primary="true" />
          </div>
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
        <a class="item" href="https://github.com/uzh/marugoto" target="_blank">GitHub</a>
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
import About from '@/components/00_static/about';
import FAQs from '@/components/00_static/faq';
import { question, answer } from 'acrion';

export default {
  name: 'registerView',
  components: { InputField, Btn, SelectField, SvgIcon, Welcome, Agreement, Citing, Reviews, Partners, About, FAQs },
  data(){
    return{
      firstName: '',
      lastName: '',
      mail: '',
      password: '',
      question: question(),
      answer: '',
      accountType: '',
      errorMessage: false,
      errorText: {
        text: '',
        errorList: {
          mail: '',
          password: '',
        },
      },
      selectedTab: 'welcome',
      shibEnabled: process.env.VUE_APP_ENABLE_SHIB,
    }
  },
  created() {
    this.accountType = this.$route.params.type || 'guest';
  },
  methods: {
    ...mapActions(['REGISTER']),
    register(){
      if ( this.firstName == '' || this.lastName == '' || this.mail == '' || this.password == '' || this.answer == '') {
        this.errorMessage = true;
        this.errorText.text = 'Please fill in all information.';
      } else {
        if ( answer(this.question, this.answer)) {
          this.$store.dispatch('REGISTER',{
            firstName: this.firstName,
            lastName: this.lastName,
            mail: this.mail,
            password: this.password,
          }).then(registerData => {
            this.$store.dispatch('LOGIN', registerData).then(() => this.$router.push('/games'));
          })
          .catch(error => {
            this.errorText.text = error.response.data.message;
            this.errorText.errorList.mail = error.response.data.errorList.mail;
            this.errorText.errorList.password = error.response.data.errorList.password;
            this.errorMessage = true;
          });
        } else {
          this.errorText.text = "Incorrect answer";
          this.errorMessage = true;
        }
      }
    },
    setGender(value){
      this.gender = value;
    },
    goToLogin(){
      this.$router.push('/login');
    },
  },
}

</script>
