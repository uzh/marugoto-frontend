<template>
  <div class="main-container">
    <!-- Add New Class -->
    <div class="supervisor-container col-xs-12">
      <!-- Page Header -->
      <div class="header">
        <div class="title">
          <h6 @click="returnToClasses">Classes</h6>
          <div class="line-divide"></div>
          <h5 v-if="classname.length < 1">Class Name</h5>
          <h5 v-if="classname.length > 0">{{ classname }}</h5>
        </div>
        <div class="button-field">
          <router-link class="back-to-games small" to="/games">Back to games</router-link>
        </div>
      </div>
      <!-- Add new class -->
      <div class="new-class-entry">
        <!-- Class name -->
        <div class="classname">
          <input
            class="input-elem"
            type="text"
            ref="classname"
            :readonly="!nameFocused"
            :size="classname.length"
            v-model="classname"
            @blur="nameFocused = false"
            @click="changeClassname"
            @change="onClassnameChange">
          <span ref="classnameSpan" class="classname-span"></span>
          <div class="icon" @click="changeClassname">
            <SvgIcon :class="nameFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
        <!-- Invitation Link -->
        <div 
          class="invitation-link"
          :class="[
            copied ? 'copied' : '',
            invitationLink != '' ? 'displayed' : ''
          ]"
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
            class="input-elem p"
            type="text"
            ref="classnameDescription"
            :size="classnameDescription.length"
            :readonly="!descriptionFocused"
            v-model="classnameDescription"
            @blur="descriptionFocused = false"
            @click="changeClassnameDescription"
            @change="onDescriptionChange">
          <span ref="descriptionSpan" class="description-span"></span>
          <div class="icon" @click="changeClassnameDescription">
            <SvgIcon :class="descriptionFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
      </div>
      <!-- Buttons -->
      <div class="buttons-footer">
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
      classname: 'Class Name',
      classnameDescription: 'Short Class Description',
      nameFocused: false,
      descriptionFocused: false,
      classStartDate: null,
      classEndDate: null,
      newStart: null,
      newEnd: null,
      invitationLink: '',
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
    onClassnameChange: function () {
      let input = this.$refs.classname;
      let spanElm = this.$refs.classnameSpan;
      spanElm.textContent = input.value;
      input.style.width = spanElm.offsetWidth + 'px';
    },
    onDescriptionChange: function () {
      let input = this.$refs.classnameDescription;
      let spanElm = this.$refs.descriptionSpan;
      spanElm.textContent = input.value;
      input.style.width = spanElm.offsetWidth + 'px';
    },
  }
}

</script>
