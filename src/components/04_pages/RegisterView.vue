<template>
<div>
  <div class="col-xs-1"></div>
  <div class="main-container col-xs-6">
    <h1 class="page-title">Welcome to Lives in Transit!</h1>
    <p class="lead-text">Lives in Transit Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero alias accusantium earum atque eum incidunt, aut?</p>
    <p>As a player you will learn Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae harum cumque ea, deserunt nihil ipsa mollitia rerum nulla ab quis optio delectus illum. Deserunt fugit enim!</p>
  </div>
  <div class="col-xs-1">
    <svgIcon @click.native="goToLogin" name="arrow-left" sizeH="20" class="back-to-login" />
  </div>
  <div class="main-container col-xs-4">
    <h1 class="page-title">Create Account</h1>
    <p class="lead col-xs-6">Enter your Data</p>
    <form class="col-xs-12" @keydown.enter="register">
      <InputField v-model="firstName" labelName="Name / Pseudonym" required="true" />
      <InputField v-model="lastName" labelName="Lastname / Pseudonym" required="true" />

      <SelectField :list="genderList" required="true" labelName="Gender" @selectChange="setGender" />
      <InputField v-model="mail" typeProp="email" labelName="E-Mail" required="true"/>
      <InputField v-model="password" typeProp="password" labelName="Password" required="true"/>
    </form>
    <Btn class="col-xs-12" @click.native="register" text="Create Account" primary="true" iconName="arrow-right" iconColor="#979797" />
  </div>
  <div class="origin-background"></div>
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
      });
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
