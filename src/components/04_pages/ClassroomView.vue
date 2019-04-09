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
          <input
            class="h5"
            placeholder="Classname"
            v-model="classname"
            readonly>
        </div>
        <div class="sign-out small">Sign Out</div>
      </div>
      <div class="new-class-entry">
        <!-- Class name -->
        <div class="classname">
          <input
            ref="classname"
            placeholder="Class Name"
            :readonly="!nameFocused"
            v-model="classname"
            @blur="nameFocused = false"
            onkeydown="this.style.width = ((this.value.length + 1) * 24) + 'px'">
          <div class="icon" @click="changeClassname">
            <SvgIcon :class="nameFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
        <!-- Invitation Link -->
        <div class="invitation-link">
          <Btn white="true" :text="invitationLink" iconName="copy" v-clipboard="invitationLink"/>
        </div>
        <!-- Date Picker -->
        <div class="date-picker">
          <v-date-picker
            class="start-date"
            :formats='formats'
            @dayclick="startDateEmit($event)"
            v-model="classStartDate">
          </v-date-picker>
          <div class="arrow-icon">
            <SvgIcon name="arrow-right" customColor="#8C8B89" sizeH="20px" sizeW="20px" />
          </div>
          <v-date-picker
            class="end-date"
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
            @blur="descriptionFocused = false"
            onkeydown="this.style.width = ((this.value.length + 1) * 12) + 'px'">
          <div class="icon" @click="changeClassnameDescription">
            <SvgIcon :class="descriptionFocused ? 'no-display' : ''" name="pen" customColor="#8C8B89" />
          </div>
        </div>
      </div>
      <!-- Student list -->
      <div v-if="get_students && get_students.length > 0" class="students-list">
        <Student
          v-for="(item, index) in get_students"
          :key="index"
          :item="item"
          @emitStudentSelection="selectStudent" />
      </div>
      <!-- Buttons -->
      <div class="buttons-footer">
        <Btn text="Go to Map" primary="true" @click.native="goToMap" />
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
      classId: '',
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
  created() {
    this.classId = this.$route.params.id;
    this.$store.dispatch('REQUEST_CLASSROOM_DATA', this.classId)
    .then(resp => {
        let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
        let parsedStartDate = resp.data.startClassAt.replace(dateRegexp, '$<day>.$<month>.$<year>');
        let parsedEndDate = resp.data.endClassAt.replace(dateRegexp, '$<day>.$<month>.$<year>');

        this.classname = resp.data.name;
        this.classnameDescription = resp.data.description;
        this.classStartDate = parsedStartDate;
        this.classEndDate = parsedEndDate;
        this.invitationLink = resp.data.invitationLinkId;
      }).then(() => {
        this.$store.dispatch('REQUEST_CLASSROOM_MEMBERS', this.classId)
      })
  },
  computed: {
    ...mapGetters([ 'get_students' ]),
  },
  methods: {
    returnToClasses: function() {
      this.$store.dispatch('UPDATE_CLASSES')
      .then(() => 
        this.$router.push('/overview')
      )
      .catch(error => {
        throw error;
      });
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
      alert('Download all Notebooks and Files');
    },
  }
}

</script>
