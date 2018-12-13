<template>
  <div>
    <h1>Log in</h1>
    <InputField v-model="mail" typeProp="email" labelName="Email" />
    <InputField v-model="password" typeProp="password" labelName="Password" />
    <hr/>
    <Btn :text="text" primary="true" @click="login" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputField from '../components/inputs';
import Btn from '../components/buttons'

export default {
  name: 'loginView',
  components: { InputField, Btn },
  data(){
    return{
      mail: '',
      password: '',
      text: 'Log in',
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    login(){
      this.$store.dispatch('LOGIN', {
        mail: this.mail,
        password: this.password,
      }).then(() => this.$router.push('/'));
    },
  },
}

</script>
