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
            <div v-show="selectedTab == 'disclaimer'">
              <h2 class="page-title mb-50">Data use agreement for Marugoto</h2>
              <p>If you require any more information or have any questions about our site's data use agreement, please feel free to contact us by email at marugoto@mail.com</p>
              <br>
              <h6>Data use agreement for Marugoto Game</h6>
              <br>
              <p>All the information on this website - <span>www.marugoto.com</span> - is published in good faith and for general information purpose only. Marugoto Game does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website, is strictly at your own risk. Marugoto Game will not be liable for any losses and/or damages in connection with the use of our website.</p>
              <br>
              <p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.</p>
              <br>
              <p>Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.</p>
              <br>
              <h6>Consent</h6>
              <br>
              <p>By using our website, you hereby consent to our data use agreement and agree to its terms.</p>
              <br>
              <h6>Update</h6>
              <br>
              <p>Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
            </div>
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
          <div class="item" :class="selectedTab == 'disclaimer' ? 'focused' : ''" @click="selectedTab = 'disclaimer'" @focus="selectedTab = 'disclaimer'" tabindex="0">Disclaimer</div>
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
