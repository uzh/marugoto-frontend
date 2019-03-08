<template>
  <div>
    <div class="login-container">
      <!-- Left main container -->
      <div class="left-container">
        <!-- Left menu -->
        <div class="left-container-menu">
          <h6 class="item">Welcome</h6>
          <h6 class="item disabled">Reviews</h6>
          <h6 class="item disabled">Collaborations</h6>
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
        <!-- Login Form -->
        <div class="wrapper-container-right">
          <h3 class="page-title mb-60">Type your new password</h3>
          <div>
            <p class="lead mb-10">Account</p>
            <div>
              <form @keydown.enter="register">
                <InputField tabindex="-1" v-model="mail" typeProp="email" labelName="E-Mail" disabled="true" />
                <InputField tabindex="1" v-model="newPassword" typeProp="password" labelName="New Password" :required="errorMessage" />
                <InputField tabindex="2" v-model="newPasswordConfirm" typeProp="password" labelName="Confirm Password" :required="errorMessage" />
              </form>
              <div v-if="errorText" class="login-error-message">
                <p>{{ errorText.text }}</p>
                <p v-if="errorText.errorList.newPassword">{{ errorText.errorList.newPassword }}</p>
              </div>
              <Btn text="Register with new password" primary="true" @click.native="register" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Background Image/Footer menu -->
    <div class="origin-background">
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
  name: 'resetView',
  components: { InputField, Btn, SelectField, SvgIcon },
  data(){
    return{
      mail: '',
      resetToken: '',
      newPassword: '',
      newPasswordConfirm: '',
      errorMessage: '',
      errorText: {
        text: '',
        errorList: {
          newPassword: '',
        },
      },
    }
  },
  created() {
    this.mail = this.$route.query.mail;
    this.resetToken = this.$route.query.resetToken;
  },
  methods: {
    ...mapActions(['RESET_PASSWORD']),
    register(){
      if (this.newPassword == '' || this.newPasswordConfirm == '') {
        this.errorMessage = true;
        this.errorText.text = '';
      } else if (this.newPassword == '' || this.newPassword != this.newPasswordConfirm) {
        this.errorMessage = true;
        this.errorText.text = 'Your two passwords must match.';
      } else {
        this.$store.dispatch('RESET_PASSWORD', {
          userEmail: this.mail,
          token: this.resetToken,
          newPassword: this.newPassword,
        }).then(() => this.$router.push('/login'))
        .catch((err) => {
          this.errorText.text = err.response.data.message;
          this.errorText.errorList.newPassword = err.response.data.errorList.newPassword;
          this.errorMessage = true;
        });
      }
    },
  },
}

</script>
