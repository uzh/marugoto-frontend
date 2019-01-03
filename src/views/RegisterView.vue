<template>
  <div class="main-container">
    <h1 class="page-title">Create new account</h1>
    
    <p class="page-title-paragraph">Please log in or create a new account to play the game:</p>
    
    <InputField v-model="firstName" labelName="Name / Pseudonym" required="true" />
    <InputField v-model="lastName" labelName="Lastname / Pseudonym" required="true" />

    <SelectField :list="genderList" required="true" genderLabel="true" />
    <InputField v-model="mail" typeProp="email" labelName="E-Mail" required="true"/>
    <InputField v-model="password" typeProp="password" labelName="Password" required="true"/>
    <Btn @click.native="register"
      text="Continue" primary="true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons';
import SelectField from '../components/selectField';

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
    }
  },
}

</script>
