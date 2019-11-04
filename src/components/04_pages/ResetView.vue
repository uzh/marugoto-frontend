<template>
  <div>
    <div class="login-container">
      <!-- Left main container -->
      <div class="left-container">
        <div class="left-container-div">
          <!-- Left menu -->
          <div class="left-container-menu">
            <div class="item" :class="selectedTab == 'welcome' ? 'focused' : ''" @click="selectedTab = 'welcome'" @focus="selectedTab = 'welcome'" tabindex="0">
              Welcome
            </div>
            <div class="item" :class="selectedTab == 'partners' ? 'focused' : ''" @click="selectedTab = 'partners'" @focus="selectedTab = 'partners'" tabindex="0">
              Partners
            </div>
            <div class="item" :class="selectedTab == 'reviews' ? 'focused' : ''" @click="selectedTab = 'reviews'" @focus="selectedTab = 'reviews'" tabindex="0">
              Reviews
            </div>
            <div class="item" :class="selectedTab == 'citing' ? 'focused' : ''" @click="selectedTab = 'citing'" @focus="selectedTab = 'citing'" tabindex="0">
              Citing LiT
            </div>
            <div class="item" :class="selectedTab == 'about' ? 'focused' : ''" @click="selectedTab = 'about'" @focus="selectedTab = 'about'" tabindex="0">
              About
            </div>
          </div>
          <!-- Left Text -->
          <div class="wrapper-container-left">
            <Welcome v-show="selectedTab == 'welcome'"/>
            <Reviews v-show="selectedTab == 'reviews'"/>
            <Partners v-show="selectedTab == 'partners'"/>
            <Citing v-show="selectedTab == 'citing'"/>
            <Agreement v-show="selectedTab == 'agreement'"/>
            <About v-show="selectedTab == 'about'"/>
          </div>
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
                <InputField tabindex="0" v-model="mail" typeProp="email" labelName="E-Mail" disabled="true" />
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
        <div class="footer-menu-right font-secondary">
          <div 
            class="item" 
            :class="selectedTab == 'agreement' ? 'focused' : ''" 
            @click="selectedTab = 'agreement'" 
            @focus="selectedTab = 'agreement'" 
            tabindex="0">
            Data use agreement
          </div>
          <a class="item" href="https://twitter.com/TransitLives" target="_blank">Twitter</a>
          <a class="item" href="https://github.com/uzh/marugoto" target="_blank">GitHub</a>
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
import Welcome from '@/components/00_static/welcome';
import Agreement from '@/components/00_static/agreement';
import Citing from '@/components/00_static/citing';
import Reviews from '@/components/00_static/reviews';
import Partners from '@/components/00_static/partners';
import About from '@/components/00_static/about';

export default {
  name: 'resetView',
  components: { InputField, Btn, SelectField, SvgIcon, Welcome, Agreement, Citing, Reviews, Partners, About },
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
      selectedTab: 'welcome',
    }
  },
  created() {
    this.mail = this.$route.query.mail;
    this.resetToken = this.$route.query.token;
  },
  methods: {
    ...mapActions(['RESET_PASSWORD']),
    register(){
      if (this.newPassword == '' && this.newPasswordConfirm == '') {
        this.errorMessage = true;
        this.errorText.text = 'Please enter and confirm your new Password.';
      } else if (this.newPassword == '') {
        this.errorMessage = true;
        this.errorText.text = 'Please enter your new Password.';
      } else if (this.newPasswordConfirm == '') {
        this.errorMessage = true;
        this.errorText.text = 'Please confirm your new Password.';
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
