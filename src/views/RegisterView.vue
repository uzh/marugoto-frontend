<template>
  <div>
    <h1>Sign in</h1>
    <InputField v-model="firstName" labelName="First Name" />
    <InputField v-model="lastName" labelName="Last Name" />
    <InputField v-model="mail" typeProp="email" labelName="Email" />
    <InputField v-model="password" typeProp="password" labelName="Password" />
    <select v-model="salutation">
      <option>Mr</option>
      <option>Ms</option>
    </select>
    <hr/>
    <Btn :text="text" primary="true" @click="register" />
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
      text: 'Register'
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
