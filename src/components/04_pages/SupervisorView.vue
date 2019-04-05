<template>
  <div class="main-container">
    <!-- Add New Class -->
    <div
      v-if="newClassPage"
      class="supervisor-container col-xs-12">
      <div class="header">
        <div class="title">
          <div
            class="h6"
            @click="newClassPage = false">Classes</div>
          <div class="line-divide"></div>
          <input
            class="h5"
            placeholder="Classname"
            v-model="classname"
            readonly>
        </div>
        <div class="sign-out small">Sign Out</div>
        <div class="profile-photo"></div>
      </div>
      <div class="new-class-entry">
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
        <div class="invitation-link" v-clipboard="invitationLink">
          <Btn white="true" :text="invitationLink" iconName="copy" />
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
      <div class="buttons-footer">
        <Btn text="Go to Map" primary="true" disabled="true" @click.native="goToMap" />
        <Btn text="Start Course" primary="true" :disabled="enableStartCourse" @click.native="startCourse" />
      </div>
    </div>
    <!-- Classroom Overview -->
    <div v-if="!newClassPage" class="supervisor-container col-xs-12">
      <div class="header">
        <div class="title h5">Classes</div>
        <div class="sign-out small">Sign Out</div>
      </div>
      <div class="add-new-class-button">
        <Btn white="true" text="Add New Class" iconName="plus" iconColor="#fff" @click.native="goToNewClass" />
      </div>
      <div v-if="get_classes && get_classes.length > 0">
        <Classroom
        v-for="(item, index) in get_classes"
        :key="index"
        :item="item"
        @emitClassroomSelection="selectClassroom" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Btn from '@/components/01_atoms/buttons';
import SvgIcon from '@/components/01_atoms/svgicon';
import Classroom from '@/components/01_atoms/classroom';

export default {
  name: 'overview',
  components: { Btn, SvgIcon, Classroom },
  data() {
    return {
      newClassPage: false,
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
        data: ['L', 'DD.MM.YYYY']
      },
    }
  },
  created() {
    this.$store.dispatch('UPDATE_CLASSES');
  },
  computed: {
    ...mapGetters([ 'get_classes' ]),
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
    selectClassroom: function(id) {
      alert('Classroom selected with id: ' + id);
    },
    goToNewClass: function() {
      this.newClassPage = true;
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
        this.$store.dispatch('UPDATE_CLASSES');
      })
      .catch(error => {
        throw error;
      });
    },
    goToMap: function() {
      alert('Go to map');
    },
    startDateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.newStart = `${d}.${m}.${event.year}`;
    },
    endDateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.newEnd = `${d}.${m}.${event.year}`;
    },
    changeClassname: function() {
      this.nameFocused = true;
      this.$refs.classname.focus();
    },
    changeClassnameDescription: function() {
      this.descriptionFocused = true;
      this.$refs.classnameDescription.focus();
    }
  }
}

</script>
