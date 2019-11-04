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
        <div class="button-field">
          <router-link class="back-to-games small" to="/games">Back to games</router-link>
          <router-link class="back-to-classes small" to="/overview">Back to classes</router-link>
          <router-link class="sign-out small" @click.native="logout">Sign out</router-link>
        </div>
      </div>
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
            @blur="saveEdit('name')"
            @click="changeClassname"
            @change="onClassnameChange">
          <span ref="classnameSpan" class="classname-span"></span>
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
          :existingDate="newExistingDate"
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
            @blur="saveEdit('description')"
            @click="changeClassnameDescription"
            @change="onDescriptionChange">
          <span ref="descriptionSpan" class="description-span"></span>
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
      // newStart: null,
      // newEnd: null,
      invitationLink: '',
      classStudents: [],
      newExistingDate: {
        start: null,
        end: null,
      },
    }
  },
  computed: {
    ...mapGetters([ 'get_students' ]),
  },
  created() {
    this.classId = this.$route.params.id;
    this.$store.dispatch('REQUEST_CLASSROOM_DATA', this.classId)
    .then(resp => {
        this.classname = resp.data.classroom.name;
        this.classnameDescription = resp.data.classroom.description;
        this.invitationLink = resp.data.classroom.invitationLinkId;
        this.classStudents = resp.data.gameStates;

        // Date parsing
        let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
        let dayMonthYearStart = resp.data.classroom.startClassAt.replace(dateRegexp, '$<day>.$<month>.$<year>');
        let dayMonthYearEnd = resp.data.classroom.endClassAt.replace(dateRegexp, '$<day>.$<month>.$<year>');
        
        let dateObj = {
          start: dayMonthYearStart,
          end: dayMonthYearEnd,
        }
        this.newExistingDate =  Object.assign({}, this.newExistingDate, dateObj);
      });
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
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    clipboardErrorHandler: function() {
      alert('Error copy to clipboard! Link is: ' + this.invitationLink)
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
    updateClasses: function(start, end) {
      this.$store.dispatch('EDIT_CLASS', {
        id: this.classId,
        data: {
          closeRegistrationOnStart: true,
          description: this.classnameDescription,
          invitationLinkId: this.invitationLink,
          name: this.classname,
          endClassAt: end,
          startClassAt: start
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
    changeDates: function(val) {
      let startClass = val[0];
      let endClass = val[1];
      this.updateClasses(startClass, endClass);
    },
    selectStudent: function(student) {
      let userId = student.user.id.slice( student.user.id.indexOf('/') + 1, student.user.id.length);
      apiService.get(`${this.apiPath}classroom/${this.$route.params.id}/files/${userId}`,{
        responseType: 'blob'})
        .then(resp => {
          const url = window.URL.createObjectURL(new Blob([resp.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'marugoto-student.zip');
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
    downloadAll: function() {
      // window.open(`${this.apiPath}classroom/${this.$route.params.id}/files`,'_blank')
      apiService.get(`${this.apiPath}classroom/${this.$route.params.id}/files`,{
        responseType: 'blob'})
        .then(resp => {
          const url = window.URL.createObjectURL(new Blob([resp.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'marugoto-class.zip');
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          throw(err);
        });
    },
  },
}

</script>
