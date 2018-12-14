<template>
  <div>
    <h1>Create new account</h1>
    <p>Please log in or create a new account to play the game:</p>
    <br>
    <InputField v-model="firstName" labelName="Name / Pseudonym" />
    <InputField v-model="lastName" labelName="Lastname / Pseudonym" />
    <InputField v-model="salutation" labelName="Gender" />
    <!-- <select v-model="salutation" class="option-select">
      <option>Male</option>
      <option>Female</option>
    </select> -->
    <InputField v-model="mail" typeProp="email" labelName="Email" />
    <Btn text="Continue" primary="true" @click="register" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons'

export default {
  name: 'registerView',
  components: { InputField, Btn },
  data(){
    return{
      firstName: '',
      lastName: '',
      mail: '',
      password: '',
      salutation: '',
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
        salutation: this.salutation,
      }).then(userInfo => {
        this.$store.dispatch('LOGIN', userInfo).then(() => this.$router.push('/'));
      });
    },
  },
}

</script>
