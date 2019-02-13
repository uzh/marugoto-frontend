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
  <div class="col-xs-1">
    <SvgIcon @click.native="goToLogin" name="arrow-left" sizeH="20" class="back-to-login" />
  </div>
  <div class="wrapper-container col-xs-4">
    <h1 class="page-title">Create Account</h1>
    <p class="lead">Enter your Data</p>
    <div class="mt-30">
      <form class="col-xs-12" @keydown.enter="register">
        <InputField v-model="firstName" labelName="Name / Pseudonym" :required="errorMessage" />
        <InputField v-model="lastName" labelName="Lastname / Pseudonym" :required="errorMessage" />
        <SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />
        <InputField v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage"/>
        <InputField v-model="password" typeProp="password" labelName="Password" :required="errorMessage"/>
      </form>
      <Btn class="col-xs-12 mt-30" @click.native="register" text="Create Account" primary="true" iconName="arrow-right" iconColor="#979797" />
    </div>
  </div>
  <div class="origin-background full-width">
    <div class="col-xs-11 col-xs-offset-1 login-page-bottom-icons">
      <!-- <SvgIcon name="blind" sizeH="20" iconPosition="left" class="col-xs-1" /> -->
      <div class="col-xs-1">Universitat Zurich</div>
      <div class="col-xs-6"></div>
      <div class="col-xs-2">Impressum</div>
      <div class="col-xs-2">Datenschutz</div>
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
    ...mapActions(['REGISTER']),
    register(){
      this.$store.dispatch('REGISTER',{
        firstName: this.firstName,
        lastName: this.lastName,
        mail: this.mail,
        password: this.password,
        salutation: this.gender
      }).then(userInfo => {
        this.$store.dispatch('LOGIN', userInfo).then(() => this.$router.push('/'));
      })
      .catch(() => this.logErrorMessage);
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
