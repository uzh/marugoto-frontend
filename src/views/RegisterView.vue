<template>
  <div>
    <h1>Sign in</h1>
    <label>First Name</label>
    <input v-model="firstName" type="text" placeholder="First Name"/>
    <label>Last Name</label>
    <input v-model="lastName" type="text" placeholder="Last Name"/>
    <label>Email</label>
    <input v-model="mail" type="email" placeholder="Email"/>
    <label>Password</label>
    <input v-model="password" type="password" placeholder="Password"/>
    <select v-model="salutation">
      <option>Mr</option>
      <option>Ms</option>
    </select>
    <hr/>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'registerView',
  data(){
    return{
      firstName: '',
      lastName: '',
      mail: '',
      password: '',
      salutation: ''
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
        this.$store.dispatch('LOGIN', userInfo).then(resp => this.$router.push('/'));
      });
    },
  },
}

</script>
