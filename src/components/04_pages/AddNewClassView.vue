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
          <input
            class="h5"
            placeholder="Classname"
            v-model="classname"
            readonly>
        </div>
        <div class="sign-out small">Sign Out</div>
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
      <!-- Buttons -->
      <div class="buttons-footer">
        <Btn text="Go to Map" primary="true" disabled="true" />
        <Btn text="Start Course" primary="true" :disabled="enableStartCourse" @click.native="startCourse" />
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/01_atoms/buttons';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'add-new-class',
  components: { Btn, SvgIcon },
  data() {
    return {
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
    returnToClasses: function() {
      this.$store.dispatch('UPDATE_CLASSES')
      .then(() => 
        this.$router.push('/overview')
      )
      .catch(error => {
        throw error;
      });
    },
    startDateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.classStartDate = `${d}.${m}.${event.year}`;
      this.newStart = `${d}.${m}.${event.year}`;
    },
    endDateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.classEndDate = `${d}.${m}.${event.year}`;
      this.newEnd = `${d}.${m}.${event.year}`;
    },
    changeClassname: function() {
      this.nameFocused = true;
      this.$refs.classname.focus();
    },
    changeClassnameDescription: function() {
      this.descriptionFocused = true;
      this.$refs.classnameDescription.focus();
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
