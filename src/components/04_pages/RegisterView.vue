<template>
<div>
  <div class="login-container">
    <!-- Left main container -->
    <div class="left-container">
      <!-- Left menu -->
      <div class="left-container-menu">
        <div class="item" :class="selectedTab == 'welcome' ? 'focused' : ''" @click="selectedTab = 'welcome'">
          Welcome
        </div>
        <div class="item" :class="selectedTab == 'reviews' ? 'focused' : ''" @click="selectedTab = 'reviews'">
          Reviews
        </div>
        <div class="item" :class="selectedTab == 'collaborations' ? 'focused' : ''" @click="selectedTab = 'collaborations'">
          Collaborations
        </div>
        <div class="item" :class="selectedTab == 'quotes' ? 'focused' : ''" @click="selectedTab = 'quotes'">
          Quotes LiT
        </div>
      </div>
      <!-- Left Text -->
      <!-- Left Text -->
        <div class="wrapper-container-left">
          <div v-show="selectedTab == 'welcome'">
            <h2 class="page-title mb-50">Welcome to Lives in Transit!</h2>
            <p>Lives in Transit is a <strong>text-based adventure game</strong> (in the words of one player). Or, to keep things respectably academic, it is an interactive E-learning tool which simulates the experience of researching and writing global history.</p>
            <br>
            <p>As a player, you will adopt the role of a university graduate student, choose a research topic, and work through a challenging set of storylines. You’ll collect real historical sources along the way and create a record of how your thinking changes during research. As a teacher, you can set your students to play in class, mapping their progress—and their frustrations—through the different storylines.</p>
            <br>
            <p>Like this historical map of Japan’s Yamashiro province, your research landscape will change as you decide which road you’ll take. So: get lost (as it were). We hope you learn and have fun.</p>
            <br>
            <p>The LiT Team, University of Zurich</p>
          </div>
          <div v-show="selectedTab == 'reviews'">
            <h2 class="page-title mb-50">Reviews</h2>
            <p>This is Reviews page.</p>
          </div>
          <div v-show="selectedTab == 'collaborations'">
            <h2 class="page-title mb-50">Collaborations</h2>
            <p>This is Collaborations page.</p>
          </div>
          <div v-show="selectedTab == 'quotes'">
            <h2 class="page-title mb-50">Quotes LiT</h2>
            <p>This is Quotes LiT page.</p>
          </div>
          <div v-show="selectedTab == 'disclaimer'">
            <h2 class="page-title mb-50">Disclaimer for Marugoto</h2>
            <p>If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at marugoto@mail.com</p>
            <br>
            <h6>Disclaimers for Marugoto Game</h6>
            <br>
            <p>All the information on this website - <span>www.marugoto.com</span> - is published in good faith and for general information purpose only. Marugoto Game does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website, is strictly at your own risk. Marugoto Game will not be liable for any losses and/or damages in connection with the use of our website.</p>
            <br>
            <p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.</p>
            <br>
            <p>Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.</p>
            <br>
            <h6>Consent</h6>
            <br>
            <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>
            <br>
            <h6>Update</h6>
            <br>
            <p>Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
          </div>
        </div>
    </div>
    <!-- Right main container -->
    <div class="right-container">
      <!-- Arrow column -->
      <div class="login-arrow">
        <SvgIcon @click.native="goToLogin" name="arrow-left" sizeH="20" class="back-to-login" />
      </div>
      <!-- Register Form -->
      <div class="wrapper-container-right">
        <!-- From Guest Account -->
        <div v-show="accountType == 'guest'">
          <h3 class="page-title mb-60">Create LiT Account</h3>
          <p class="lead mb-10">Enter your Data</p>
          <div>
            <form class="full-width" @keydown.enter="register">
              <InputField v-model="firstName" labelName="Name / Pseudonym" :required="errorMessage" />
              <InputField v-model="lastName" labelName="Lastname / Pseudonym" :required="errorMessage" />
              <SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />
              <InputField v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage" />
              <InputField v-model="password" typeProp="password" labelName="Password" :required="errorMessage"/>
            </form>
            <div v-if="errorText" class="login-error-message">
              <p>{{ errorText.text }}</p>
              <p v-if="errorText.errorList.mail">- {{ errorText.errorList.mail }}</p>
              <p v-if="errorText.errorList.password">- {{ errorText.errorList.password }}</p>
            </div>
            <Btn class="mt-30" @click.native="register" text="Create Account" primary="true" />
          </div>
        </div>
        <!-- From University Account -->
        <div v-show="accountType == 'university'">
          <h3 class="page-title mb-60">Create University Account</h3>
          <p class="lead mb-10">Enter your Data</p>
          <div>
            <form class="full-width" @keydown.enter="register">
              <InputField v-model="firstName" labelName="Name / Pseudonym" :required="errorMessage" />
              <InputField v-model="lastName" labelName="Lastname / Pseudonym" :required="errorMessage" />
              <SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />
              <InputField v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage" iconName="info" />
            </form>
            <div v-if="errorText" class="login-error-message">
              <p>{{ errorText.text }}</p>
              <p v-if="errorText.errorList.mail">- {{ errorText.errorList.mail }}</p>
              <p v-if="errorText.errorList.password">- {{ errorText.errorList.password }}</p>
            </div>
            <Btn class="mt-30" @click.native="register" text="Create Account" primary="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Background Image/Footer menu -->
  <div class="origin-background full-width">
    <div class="col-xs-10 col-xs-offset-1 login-page-bottom-icons">
      <div class="footer-logo">
        <div class="logo"></div>
      </div>
      <div class="footer-menu-right">
        <div class="item">Disclaimer</div>
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
      accountType: '',
      errorMessage: false,
      errorText: {
        text: '',
        errorList: {
          mail: '',
          password: '',
        },
      },
      selectedTab: 'welcome',
    }
  },
  created() {
    this.accountType = this.$route.params.type || 'guest';
  },
  methods: {
    ...mapActions(['REGISTER']),
    register(){
      if ( this.firstName == '' || this.lastName == '' || this.mail == '' || this.password == '' || this.salutation == '') {
        this.errorMessage = true;
        this.errorText.text = 'Please fill in all information.';
      } else {
        this.$store.dispatch('REGISTER',{
          firstName: this.firstName,
          lastName: this.lastName,
          mail: this.mail,
          password: this.password,
          salutation: this.gender
        }).then(registerData => {
          this.$store.dispatch('LOGIN', registerData).then(() => this.$router.push('/'));
        })
        .catch(error => {
          this.errorText.text = error.response.data.message;
          this.errorText.errorList.mail = error.response.data.errorList.mail;
          this.errorText.errorList.password = error.response.data.errorList.password;
          this.errorMessage = true;
        });
      }
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
