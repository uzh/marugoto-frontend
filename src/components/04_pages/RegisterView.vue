<template>
<div>
  <div class="login-container">
    <!-- Left main container -->
    <div class="left-container">
      <!-- Left menu -->
      <div class="left-container-menu">
        <div class="rotated-text-login-page">
          <p class="item">Welcome</p>
          <p class="item disabled">Reviews</p>
          <p class="item disabled">Collaborations</p>
        </div>
      </div>
      <!-- Left Text -->
      <div class="wrapper-container-left">
        <h2 class="page-title mb-50">Welcome to Lives in Transit!</h2>
        <p>Lives in Transit is a text-based adventure game (in the words of one player). Or, to keep things respectably academic, it is an interactive E-learning tool which simulates the experience of researching and writing global history.</p>
        <br>
        <p>As a player, you will adopt the role of a university graduate student, choose a research topic, and work through a challenging set of storylines. You’ll collect real historical sources along the way and create a record of how your thinking changes during research. As a teacher, you can set your students to play in class, mapping their progress—and their frustrations—through the different storylines.</p>
        <br>
        <p>Like this historical map of Japan’s Yamashiro province, your research landscape will change as you decide which road you’ll take. So: get lost (as it were).</p>
        <br>
        <p>We hope you learn and have fun. The LiT Team, University of Zurich</p>
      </div>
    </div>
    <!-- Right main container -->
    <div class="right-container">
      <!-- Arrow column -->
      <div class="login-arrow">
        <SvgIcon @click.native="goToLogin" name="arrow-left" sizeH="20" class="back-to-login" />
      </div>
      <!-- Register Form -->
      <div class="wrapper-container-right">
        <!-- From Guest Account -->
        <div v-show="accountType == 'guest'">
          <h3 class="page-title mb-60">Create LiT Account</h3>
          <p class="lead mb-10">Enter your Data</p>
          <div>
            <form class="full-width" @keydown.enter="register">
              <InputField v-model="password" typeProp="password" labelName="Password" :required="errorMessage"/>
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
            <Btn class="mt-30" @click.native="register" text="Create Account" primary="true" />
          </div>
        </div>
        <!-- From University Account -->
        <div v-show="accountType == 'university'">
          <h3 class="page-title mb-60">Create University Account</h3>
          <p class="lead mb-10">Enter your Data</p>
          <div>
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
            <Btn class="mt-30" @click.native="register" text="Create Account" primary="true" />
          </div>
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
        }).then(registerData => {
          this.$store.dispatch('LOGIN', registerData).then(() => this.$router.push('/'));
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
