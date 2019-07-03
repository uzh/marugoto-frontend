<template>
  <div class="main-container">
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
            onkeydown="this.style.width = ((this.value.length + 1) * 24) + 'px'">
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
        <div class="date-picker">
          <v-date-picker
            class="start-date"
            :max-date="classEndDate"
            :formats='formats'
            @dayclick="startDateEmit($event)"
            v-model="classStartDate">
          </v-date-picker>
          <div class="arrow-icon">
            <SvgIcon name="arrow-right" customColor="#8C8B89" sizeH="20px" sizeW="20px" />
          </div>
          <v-date-picker
            class="end-date"
            :min-date="classStartDate"
            :formats='formats'
            @dayclick="endDateEmit($event)"
            v-model="classEndDate">
          </v-date-picker>
          <div class="calendar">
            <SvgIcon name="calendar" customColor="#8C8B89" />
          </div>
        </div>
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
            onkeydown="this.style.width = ((this.value.length + 1) * 12) + 'px'">
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
import Btn from '@/components/01_atoms/buttons';
import SvgIcon from '@/components/01_atoms/svgicon';
import Student from '@/components/01_atoms/classroom/student';

export default {
  name: 'classroom',
  components: { Btn, SvgIcon, Student },
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
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['DD.MM.YYYY'],
        dayPopover: 'L',
        data: ['DD.MM.YYYY'],
      },
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
        this.$store.dispatch('REQUEST_CLASSROOM_MEMBERS', this.classId)
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
    startDateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.classStartDate = `${d}.${m}.${event.year}`;
      this.newStart = `${d}.${m}.${event.year}`;
      this.updateClasses();
    },
    endDateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.classEndDate = `${d}.${m}.${event.year}`;
      this.newEnd = `${d}.${m}.${event.year}`;
      this.updateClasses();
    },
    selectStudent: function() {
      alert('Student selected');
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
      window.open(`${this.apiPath}classroom/${this.$route.params.id}/files`,'_blank')
    },
  }
}

</script>
