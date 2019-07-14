<template>
  <div class="main-container">
    <div class="supervisor-container col-xs-12">
      <!-- Page Header -->
      <div class="header">
        <div class="title">
          <h6 @click="returnToClasses">Classes</h6>
          <div class="line-divide"></div>
          <h5 v-if="classname.length < 1">Class Name</h5>
          <h5 v-if="classname.length > 0">{{ classname }}</h5>
        </div>
        <router-link class="sign-out small" to="/games">Sign Out</router-link>
      </div>
      <div class="new-class-entry">
        <!-- Class name -->
        <div class="classname">
          <input
            ref="classname"
            placeholder="Class Name"
            :readonly="!nameFocused"
            v-model="classname"
            @blur="saveEdit('name')"
            @click="changeClassname"
            onkeydown="this.style.width = ((this.value.length + 1) * 20) + 'px'">
          <div class="icon" @click="changeClassname">
            <SvgIcon :class="nameFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
        <!-- Invitation Link -->
        <div 
          class="invitation-link displayed"
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
            @blur="saveEdit('description')"
            @click="changeClassnameDescription"
            onkeydown="this.style.width = ((this.value.length + 1) * 10) + 'px'">
          <div class="icon" @click="changeClassnameDescription">
            <SvgIcon :class="descriptionFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
      </div>
      <!-- Student list -->
      <div v-if="classStudents && classStudents.length > 0" class="students-list">
        <Student
          v-for="(item, index) in classStudents"
          :key="index"
          :item="item"
          @emitStudentSelection="selectStudent" />
      </div>
      <!-- Buttons -->
      <div class="buttons-footer">
        <!-- <Btn text="Go to Map" primary="true" @click.native="goToMap" /> -->
        <Btn text="Download all Notebooks & Files" primary="true" @click.native="downloadAll" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import apiService from '@/apiService'
import Btn from '@/components/01_atoms/buttons';
import SvgIcon from '@/components/01_atoms/svgicon';
import Student from '@/components/01_atoms/classroom/student';
import DateComponent from '@/components/02_molecules/pageComponents/dateComponent';

export default {
  name: 'classroom',
  components: { Btn, SvgIcon, Student, DateComponent },
  data() {
    return {
      localPath: process.env.VUE_APP_LOCAL_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      apiPath: process.env.VUE_APP_API_PATH,
      classId: '',
      classname: '',
      copied: false,
      classnameDescription: '',
      nameFocused: false,
      descriptionFocused: false,
      classStartDate: null,
      classEndDate: null,
      newStart: null,
      newEnd: null,
      invitationLink: '',
      classStudents: [],
    }
  },
  computed: {
    ...mapGetters([ 'get_students' ]),
  },
  created() {
    this.classId = this.$route.params.id;
    this.$store.dispatch('REQUEST_CLASSROOM_DATA', this.classId)
    .then(resp => {
        let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
        let parsedStartDate = resp.data.classroom.startClassAt.replace(dateRegexp, '$<month>.$<day>.$<year>');
        let parsedEndDate = resp.data.classroom.endClassAt.replace(dateRegexp, '$<month>.$<day>.$<year>');

        let dayMonthYearStart = resp.data.classroom.startClassAt.replace(dateRegexp, '$<day>.$<month>.$<year>');
        let dayMonthYearEnd = resp.data.classroom.endClassAt.replace(dateRegexp, '$<day>.$<month>.$<year>');
        
        this.classname = resp.data.classroom.name;
        this.classnameDescription = resp.data.classroom.description;
        this.newStart = dayMonthYearStart;
        this.newEnd = dayMonthYearEnd;
        this.classStartDate = new Date(parsedStartDate);
        this.classEndDate = new Date(parsedEndDate);
        this.invitationLink = resp.data.classroom.invitationLinkId;

        this.classStudents = resp.data.gameStates;

      }).then(() => {
        //this.$store.dispatch('REQUEST_CLASSROOM_MEMBERS', this.classId)
      })
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
    updateClasses: function() {
      this.$store.dispatch('EDIT_CLASS', {
        id: this.classId,
        data: {
          closeRegistrationOnStart: true,
          description: this.classnameDescription,
          endClassAt: this.newEnd,
          invitationLinkId: this.invitationLink,
          name: this.classname,
          startClassAt: this.newStart
        },
      });
    },
    saveEdit: function(type) {
      if( type === 'description' ){
        this.descriptionFocused = false;
      }else if( type === 'name' ){
        this.nameFocused = false;
      }
      this.updateClasses();
    },
    changeDates: function() {
      this.updateClasses();
    },
    selectStudent: function(student) {
      let userId = student.user.id.slice( student.user.id.indexOf('/') + 1, student.user.id.length);
      apiService.get(`${this.apiPath}classroom/${this.$route.params.id}/files/${userId}`,{
        responseType: 'blob'})
        .then(resp => {
          const url = window.URL.createObjectURL(new Blob([resp.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'student.zip');
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          throw(err);
        });
    },
    goToMap: function() {
      alert('Go to map');
    },
    changeClassname: function() {
      this.nameFocused = true;
      this.$refs.classname.focus();
    },
    changeClassnameDescription: function() {
      this.descriptionFocused = true;
      this.$refs.classnameDescription.focus();
    },
    downloadAll: function() {
      // window.open(`${this.apiPath}classroom/${this.$route.params.id}/files`,'_blank')
      apiService.get(`${this.apiPath}classroom/${this.$route.params.id}/files`,{
        responseType: 'blob'})
        .then(resp => {
          const url = window.URL.createObjectURL(new Blob([resp.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'game.zip');
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          throw(err);
        });
    },
  }
}

</script>
