<template>
  <div class="main-container">
    <!-- Add New Class -->
    <div v-if="newClassPage" class="supervisor-container col-xs-12">
      <div class="header">
        <div class="title">
          <div class="h6">Classes</div>
          <div class="line-divide"></div>
          <div class="h5">Classname</div>
        </div>
        <div class="sign-out small">Sign Out</div>
        <div class="profile-photo"></div>
      </div>
      <div class="new-class-entry">
        <div class="classname">
          <input ref="classname" placeholder="Class Name" v-model="classname" >
          <div class="icon" @click="changeClassname">
            <SvgIcon name="pen" customColor="#8C8B89" sizeH="40px" sizeW="40px" />
          </div>
        </div>
        <!-- Invitation Link -->
        <div class="invitation-link">
          <Btn ghost="true" :text="invitationLink" iconName="copy" @click.native="copyInvitationLink" />
        </div>
        <!-- Date Picker -->
        <div class="date-picker">
          <v-date-picker
            class="start-date"
            :formats='formats'
            @dayclick="dateEmit($event)"
            v-model="classStartDate">
          </v-date-picker>
          <div class="arrow-icon">
            <SvgIcon name="arrow-right" customColor="#8C8B89" sizeH="20px" sizeW="20px" />
          </div>
          <v-date-picker
            class="end-date"
            :formats='formats'
            @dayclick="dateEmit($event)"
            v-model="classEndDate">
          </v-date-picker>
          <div class="calendar">
            <SvgIcon name="calendar" customColor="#8C8B89" />
          </div>
        </div>
        <div class="classname-description">
          <input class="p" ref="classnameDescription" placeholder="Short Class Description" v-model="classnameDescription" >
          <div class="icon" @click="changeClassnameDescription">
            <SvgIcon name="pen" customColor="#8C8B89" />
          </div>
        </div>
      </div>
      <div class="buttons-footer">
        <Btn text="Go to Map" ghost="true" disabled="true" @click.native="goToMap" />
        <Btn text="Start Course" ghost="true" :disabled="enableStartCourse" @click.native="startCourse" />
      </div>
    </div>
    <!-- Classroom Overview -->
    <div v-if="!newClassPage" class="supervisor-container col-xs-12">
      <div class="header">
        <div class="title h5">Classes</div>
        <div class="sign-out small">Sign Out</div>
      </div>
      <div class="add-new-class-button">
        <Btn ghost="true" text="Add New Class" iconName="plus" iconColor="#fff" @click.native="goToNewClass" />
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
      newClassPage: true,
      classname: '',
      classnameDescription: '',
      classStartDate: null,
      classEndDate: null,
      invitationLink: 'marugo.to/xsde7fg',
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['DD.MM.YYYY'],
        dayPopover: 'L',
        data: ['YYYY-MM-DD']
      },
      dateFormated: '',
    }
  },
  created() {
    this.$store.dispatch('UPDATE_CLASSES');
  },
  computed: {
    ...mapGetters([ 'get_classes' ]),
    enableStartCourse: function() {
      if(this.classname == '' || this.classnameDescription == '' || this.classStartDate == null || this.classEndDate == null || this.invitationLink == '') {
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
        startClassAt: this.classStartDate,
        endClassAt: this.classEndDate,
        invitationLinkId: this.invitationLink,
      }).then(() => {
        this.$store.dispatch('UPDATE_CLASSES');
        this.newClassPage = false;
        this.$router.push('/overview');
      })
      .catch(error => {
        throw error;
      });
    },
    goToMap: function() {
      alert('Go to map');
    },
    copyInvitationLink: function() {
      alert("Copied the text: " + this.invitationLink);
    },
    dateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.dateFormated = `${d}.${m}.${event.year}`;
    },
    changeClassname: function() {
      this.$refs.classname.focus();
    },
    changeClassnameDescription: function() {
      this.$refs.classnameDescription.focus();
    }
  }
}

</script>
