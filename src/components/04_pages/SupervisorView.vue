<template>
  <div class="main-container">
    <div class="supervisor-container col-xs-12">
      <!-- Page Header -->
      <div class="header">
        <h5 class="title">Classes</h5>
        <div>
          <router-link class="sign-out small" to="/games">Back to games</router-link>
          <router-link class="sign-out small" to="/logout">Sign out</router-link>
        </div>
      </div>
      <!-- Add new class -->
      <div class="add-new-class-button">
        <Btn white="true" text="Add New Class" iconName="plus" iconColor="#fff" @click.native="goToNewClass" />
      </div>
      <!-- Classroom list -->
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
import Classroom from '@/components/01_atoms/classroom';

export default {
  name: 'overview',
  components: { Btn, Classroom },
  created() {
    this.$store.dispatch('UPDATE_CLASSES');
  },
  computed: {
    ...mapGetters([ 'get_classes' ]),
  },
  methods: {
    selectClassroom: function(item) {
      let id = item.classroom.id.split('/')[1];
      this.$router.push({ name: 'classroom', params: { id: id }});
    },
    goToNewClass: function() {
      this.$router.push('/add-new-class');
    },
  }
}

</script>
