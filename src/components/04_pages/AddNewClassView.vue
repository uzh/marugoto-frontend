<template>
  <div class="main-container">
    <!-- Add New Class -->
    <div class="supervisor-container col-xs-12">
      <!-- Page Header -->
      <div class="header">
        <div class="title">
          <div
            class="h6"
            @click="returnToClasses">Classes</div>
          <div class="line-divide"></div>
          <p v-if="classname.length < 1" class="h5">Class Name</p>
          <p v-if="classname.length > 0" class="h5">{{ classname }}</p>
        </div>
        <router-link class="sign-out small" to="/games">Sign Out</router-link>
        <div class="profile-photo"></div>
      </div>
      <!-- Add new class -->
      <div class="new-class-entry">
        <!-- Class name -->
        <div class="classname">
          <input
            ref="classname"
            placeholder="Class Name"
            :readonly="!nameFocused"
            v-model="classname"
            @blur="nameFocused = false"
            @click="changeClassname"
            onkeydown="this.style.width = ((this.value.length + 1) * 20) + 'px'">
          <div class="icon" @click="changeClassname">
            <SvgIcon :class="nameFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
        <!-- Invitation Link -->
        <div 
          class="invitation-link" 
          :class="copied ? 'copied' : '' "
          v-clipboard="`${this.localPath}class/${this.invitationLink}`"
          v-clipboard:success="clipboardSuccessHandler"
          v-clipboard:error="clipboardErrorHandler">
          <Btn white="true" :text="invitationLink" iconName="copy" />
        </div>
        <!-- Date Picker -->
        <DateComponent
          pickerMode="range"
          @emitDateChange="changeDates" />
        <!-- Class description -->
        <div class="classname-description">
          <input
            class="p"
            ref="classnameDescription"
            placeholder="Short Class Description"
            :readonly="!descriptionFocused"
            v-model="classnameDescription"
            @blur="descriptionFocused = false"
            @click="changeClassnameDescription"
            onkeydown="this.style.width = ((this.value.length + 1) * 10) + 'px'">
          <div class="icon" @click="changeClassnameDescription">
            <SvgIcon :class="descriptionFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
      </div>
      <!-- Buttons -->
      <div class="buttons-footer">
        <!-- <Btn text="Go to Map" primary="true" disabled="true" /> -->
        <Btn text="Create Class" primary="true" :disabled="enableStartCourse" @click.native="startCourse" />
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/01_atoms/buttons';
import SvgIcon from '@/components/01_atoms/svgicon';
import DateComponent from '@/components/02_molecules/pageComponents/dateComponent';

export default {
  name: 'add-new-class',
  components: { Btn, SvgIcon, DateComponent },
  data() {
    return {
      localPath: process.env.VUE_APP_LOCAL_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      copied: false,
      classname: '',
      classnameDescription: '',
      nameFocused: false,
      descriptionFocused: false,
      classStartDate: null,
      classEndDate: null,
      newStart: null,
      newEnd: null,
      invitationLink: '',
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['DD.MM.YYYY'],
        dayPopover: 'L',
        data: ['DD.MM.YYYY']
      },
    }
  },
  computed: {
    enableStartCourse: function() {
      if(this.invitationLink != '') {
        return true;
      } else if(this.classname == '' || this.classnameDescription == '' || this.classStartDate == null || this.classEndDate == null) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    clipboardSuccessHandler: function() {
      if( this.invitationLink === '' ){
        return;
      }
      var self = this;
      this.copied = true;
      this.$clipboard(`${this.localPath}class/${this.invitationLink}`)
      setTimeout(() => {
        self.copied = false;
      }, 2000);
    },
    clipboardErrorHandler: function() {
      alert('Error cipy to clipboard! Link is: ' + this.invitationLink)
    },
    returnToClasses: function() {
      this.$store.dispatch('UPDATE_CLASSES')
      .then(() => 
        this.$router.push('/overview')
      )
      .catch(error => {
        throw error;
      });
    },
    changeClassname: function() {
      this.nameFocused = true;
      this.$refs.classname.focus();
    },
    changeClassnameDescription: function() {
      this.descriptionFocused = true;
      this.$refs.classnameDescription.focus();
    },
    changeDates: function(dates) {
      if(dates.length == 2) {
        dates.sort(function(a, b) {
          let c = a.split('.').reverse().join('');
          let d = b.split('.').reverse().join('');
          return c > d ? 1 : c < d ? -1 : 0;
        });
      }
      this.classStartDate = dates[0];
      this.classEndDate = dates[1];
      this.newStart = dates[0];
      this.newEnd = dates[1];
    },
    startCourse: function() {
      this.$store.dispatch('ADD_NEW_CLASS', {
        name: this.classname,
        description: this.classnameDescription,
        startClassAt: this.newStart,
        endClassAt: this.newEnd,
        invitationLinkId: this.invitationLink,
      }).then(resp => {
        this.invitationLink = resp.data.invitationLinkId;
      })
      .catch(error => {
        throw error;
      });
    },
  }
}

</script>
