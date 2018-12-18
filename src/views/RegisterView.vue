<template>
  <div class="main-container">
    <h1 class="page-title">Create new account</h1>
    <br />
    <p class="page-title-paragraph">Please log in or create a new account to play the game:</p>
    <br>
    <InputField v-model="firstName" labelName="Name / Pseudonym" required="true" />
    <InputField v-model="lastName" labelName="Lastname / Pseudonym" />
    <SelectField :list="genderList" @selectChange="logResult" />
    <InputField v-model="mail" typeProp="email" labelName="Email" iconPosition="right" />
    <br />
    <br />
    <Btn text="Continue" primary="true" iconPosition="right" @click="register" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons'
import SelectField from '../components/selectField'

export default {
  name: 'registerView',
  components: { InputField, Btn, SelectField },
  data(){
    return{
      firstName: '',
      lastName: '',
      mail: '',
      password: '',
      genderList: [
        {
          name: 'Male'
        },
        {
          name: 'Female'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['REGISTER']),
    logResult(value){
      console.log(value);
    },
    register(){
      this.$store.dispatch('REGISTER',{
        firstName: this.firstName,
        lastName: this.lastName,
        mail: this.mail,
        password: this.password,
      }).then(userInfo => {
        this.$store.dispatch('LOGIN', userInfo).then(() => this.$router.push('/'));
      });
    }
  },
}

</script>
