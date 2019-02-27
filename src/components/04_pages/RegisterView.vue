<template>
<div>
  <div class="login-container">
    <!-- Left main container -->
    <div class="col-xs-7 left-container">
      <!-- Left menu -->
      <div class="rotated-text-login-page">
        <p class="item">Welcome</p>
        <p class="item disabled">Reviews</p>
        <p class="item disabled">Collaborations</p>
      </div>
      <!-- Left Text -->
      <div class="wrapper-container-left">
        <h2 class="page-title mb-50">Welcome to Lives in Transit!</h2>
        <p>Lives in Transit Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero alias accusantium earum atque eum incidunt, aut?</p>
        <br>
        <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
        <br>
        <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
        <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
        <br>
        <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
      </div>
      <!-- Empty columns -->
      <div class="empty-column"></div>
    </div>
    <!-- Right main container -->
    <div>
      <!-- Arrow column -->
      <div class="col-xs-1">
        <SvgIcon @click.native="goToLogin" name="arrow-left" sizeH="20" class="back-to-login" />
      </div>
      <!-- Register Form -->
      <div class="wrapper-container col-xs-4">
        <h3 class="page-title mb-60">Create Account</h3>
        <p class="lead mb-10">Enter your Data</p>
        <!-- From Guest Account -->
        <div v-show="accountType == 'guest'" class="mt-30">
          <form class="full-width" @keydown.enter="register">
            <InputField v-model="firstName" labelName="Name / Pseudonym" :required="errorMessage" />
            <InputField v-model="lastName" labelName="Lastname / Pseudonym" :required="errorMessage" />
            <SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />
            <InputField v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage" iconName="info" />
            <InputField v-model="password" typeProp="password" labelName="Password" :required="errorMessage"/>
          </form>
          <div v-if="errorText" class="login-error-message">
            <p>{{ errorText.text }}</p>
            <p v-if="errorText.errorList.mail">- {{ errorText.errorList.mail }}</p>
            <p v-if="errorText.errorList.password">- {{ errorText.errorList.password }}</p>
          </div>
          <Btn class="full-width" @click.native="register" text="Create Account" primary="true" iconName="arrow-right" iconColor="#979797" />
        </div>
        <!-- From University Account -->
        <div v-show="accountType == 'university'" class="mt-30">
          <form class="full-width" @keydown.enter="register">
            <InputField v-model="firstName" labelName="Name / Pseudonym" :required="errorMessage" />
            <InputField v-model="lastName" labelName="Lastname / Pseudonym" :required="errorMessage" />
            <SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />
            <InputField v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage" iconName="info" />
          </form>
          <div v-if="errorText" class="login-error-message">
            <p>{{ errorText.text }}</p>
            <p v-if="errorText.errorList.mail">- {{ errorText.errorList.mail }}</p>
            <p v-if="errorText.errorList.password">- {{ errorText.errorList.password }}</p>
          </div>
          <Btn class="full-width" @click.native="register" text="Create Account" primary="true" iconName="arrow-right" iconColor="#979797" />
        </div>
      </div>
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
  name: 'registerView',
  components: { InputField, Btn, SelectField, SvgIcon },
  data(){
    return{
      firstName: '',
      lastName: '',
      mail: '',
      password: '',
      genderList: [
        {
          name: 'Male',
          value: 'Mr',
        },
        {
          name: 'Female',
          value: 'Ms',
        }
      ],
      gender: '',
      accountType: '',
      errorMessage: false,
      errorText: {
        text: '',
        errorList: {
          mail: '',
          password: '',
        },
      },
    }
  },
  created() {
    this.accountType = this.$route.params.type || 'guest';
  },
  methods: {
    ...mapActions(['REGISTER']),
    register(){
      if ( this.firstName == '' || this.lastName == '' || this.mail == '' || this.password == '' || this.salutation == '') {
        this.errorMessage = true;
        this.errorText.text = '';
      } else {
        this.$store.dispatch('REGISTER',{
          firstName: this.firstName,
          lastName: this.lastName,
          mail: this.mail,
          password: this.password,
          salutation: this.gender
        }).then(userInfo => {
          this.$store.dispatch('LOGIN', userInfo).then(() => this.$router.push('/'));
        })
        .catch((err) => {
          this.errorText.text = err.response.data.message;
          this.errorText.errorList.mail = err.response.data.errorList.mail;
          this.errorText.errorList.password = err.response.data.errorList.password;
          this.errorMessage = true;
        });
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
