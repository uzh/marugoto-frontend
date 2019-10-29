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
          <div class="item" :class="selectedTab == 'quotes' ? 'focused' : ''" @click="selectedTab = 'quotes'" @focus="selectedTab = 'quotes'" tabindex="0">
            Citing LiT
          </div>
        </div>
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
            <p>This is the Reviews page.</p>
          </div>
          <div v-show="selectedTab == 'partners'">
            <h2 class="page-title mb-50">Partners</h2>
            <p>The development of “Lives in Transit” has been supported by <a href="http://www.snf.ch/en/Pages/default.aspx">Swiss National Science Foundation (SNF)</a> as part of the “Lives in Transit: Steamship Passages in the Late-19th and Early-20th Century World” project. This is a collaboration between Prof. Martin Dusinberre (University of Zurich) and Prof. Roland Wenzlhuemer (LMU Munich), jointly funded by the SNF and the <a href="https://www.dfg.de/en/">German Research Foundation (DFG)</a>, 2017-2020. Additional financial support has been provided by the <a href="https://www.hist.uzh.ch/de.html">UZH Department of History</a> and the <a href="https://www.dsi.uzh.ch/en.html">UZH Digital Society Initiative</a>.<br><br>“Lives in Transit” has been an interdisciplinary research project. In addition to the historical team led by Prof. Dusinberre, we have worked closely with the University of Zurich’s <a href="https://www.zi.uzh.ch/en/teaching-and-research/science-it/">S3IT</a> unit, Ansich GmbH, and <a href="https://vitamin2.ch/">Vitamin2</a> GmbH. We would like to thank all the colleagues, students and friends who have tested and offered feedback on the game since 2016.</p>
          </div>
          <div v-show="selectedTab == 'quotes'">
            <h2 class="page-title mb-50">Citing LiT</h2>
            <p>This is the Citing LiT page.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Right main container -->
    <div class="right-container">
      <!-- Arrow column -->
      <div class="login-arrow">
        <SvgIcon 
          @click.native="goToLogin" 
          name="arrow-left" 
          customColor="#8C8B89" 
          class="back-to-login" />
      </div>
      <!-- Register Form -->
      <div class="wrapper-container-right">
        <!-- From Guest Account -->
        <div v-show="accountType == 'guest'">
          <h3 class="page-title mb-60">Create LiT Account</h3>
          <p class="lead mb-10">Enter your Data</p>
          <div>
            <form class="full-width" @keydown.enter="register">
              <InputField 
                autocomplete="off"
                inputName="registerFirstName" 
                v-model="firstName" 
                labelName="Name / Pseudonym" 
                :required="errorMessage" />
              <InputField 
                autocomplete="off"
                inputName="registerLastName" 
                v-model="lastName" 
                labelName="Lastname / Pseudonym" 
                :required="errorMessage" />
              <!--<SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />-->
              <InputField 
                autocomplete="off"
                inputName="registerEmail" 
                v-model="mail" 
                typeProp="email" 
                labelName="E-Mail" 
                :required="errorMessage" />
              <InputField 
                autocomplete="off"
                inputName="registerPassword" 
                v-model="password" 
                typeProp="password" 
                labelName="Password" 
                :required="errorMessage"/>
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
              <InputField inputName="unFirstName" v-model="firstName" labelName="Name / Pseudonym" :required="errorMessage" />
              <InputField inputName="unLastname" v-model="lastName" labelName="Lastname / Pseudonym" :required="errorMessage" />
              <!--<SelectField :list="genderList" labelName="Gender" :required="errorMessage" @selectChange="setGender" />-->
              <InputField inputName="unEmail" v-model="mail" typeProp="email" labelName="E-Mail" :required="errorMessage" iconName="info" />
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
  <div class="origin-background">
    <div class="col-xs-10 col-xs-offset-1 login-page-bottom-icons">
      <div class="footer-logo">
        <div class="logo"></div>
      </div>
      <div class="footer-menu-right font-secondary">
        <a 
          class="item" 
          target="_blank" href="/agreement">Data use agreement
        </a>
        <a class="item" href="https://twitter.com/TransitLives" target="_blank">Twitter</a>
        <a class="item" href="https://github.com/uzh/marugoto" target="_blank">Github</a>
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
      // genderList: [
      //   {
      //     name: 'Male',
      //     value: 'Male',
      //   },
      //   {
      //     name: 'Female',
      //     value: 'Female',
      //   }
      // ],
      // gender: '',
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
      if ( this.firstName == '' || this.lastName == '' || this.mail == '' || this.password == '') {
        this.errorMessage = true;
        this.errorText.text = 'Please fill in all information.';
      } else {
        this.$store.dispatch('REGISTER',{
          firstName: this.firstName,
          lastName: this.lastName,
          mail: this.mail,
          password: this.password
        }).then(registerData => {
          this.$store.dispatch('LOGIN', registerData).then(() => this.$router.push('/games'));
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
