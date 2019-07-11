<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon'

export default {
  name: 'DateComponent',
  props: [ 'exerciseId' ],
  components: { SvgIcon },
  data: function() {
    return{
      stateID: this.exerciseId,
      selectedDate: null,
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['DD.MM.YYYY'],
        dayPopover: 'L',
        data: ['YYYY-MM-DD'],
      },
      dateFormated: '',
    }
  },
  methods: {
    emitDate: function(date){
      this.$emit('emitDateChange', date, this.stateID);
    },
    dateEmit: function(event) {
      let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
      let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
      this.dateFormated = `${d}.${m}.${event.year}`;
      this.emitDate(this.dateFormated);
    },
  },
}
</script>
