<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon'

export default {
  name: 'DateComponent',
  props: [ 'pickerMode', 'existingDate' ],
  components: { SvgIcon },
  data: function() {
    return{
      selectedDate: this.existingDate,
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'WW',
        navMonths: 'MMM',
        input: ['DD.MM.YYYY'],
        dayPopover: 'L',
        data: ['YYYY-MM-DD'],
      },
    }
  },
  methods: {
    emitDate: function(date){
      this.$emit('emitDateChange', date);
    },
    dateEmit: function(val) {
      
      let datesF = [];
      let newDateStart = new Date(val.start);
      let newDateEnd = new Date(val.end);

      let eventStart = {
        day: newDateStart.getDate(),
        month: newDateStart.getMonth() + 1,
        year: newDateStart.getFullYear(),
      }

      let eventEnd = {
        day: newDateEnd.getDate(),
        month: newDateEnd.getMonth() + 1,
        year: newDateEnd.getFullYear(),
      }
      
      let dS = eventStart.day.toString().length == 1 ? `0${eventStart.day}` : eventStart.day;
      let mS = eventStart.month.toString().length == 1 ? `0${eventStart.month}` : eventStart.month;
      datesF.push(`${dS}.${mS}.${eventStart.year}`);

      let dE = eventEnd.day.toString().length == 1 ? `0${eventEnd.day}` : eventEnd.day;
      let mE = eventEnd.month.toString().length == 1 ? `0${eventEnd.month}` : eventEnd.month;
      datesF.push(`${dE}.${mE}.${eventEnd.year}`);

      
      this.emitDate(datesF);
    },
  },
  watch: {
    existingDate: function(newVal) {
      let startDate = newVal.start.split(".");
      let endDate = newVal.end.split(".");
      this.selectedDate = {
        start: new Date(startDate[2], startDate[1] - 1, startDate[0]),
        end: new Date(endDate[2], endDate[1] - 1, endDate[0]),
      }
    },
    selectedDate: function(newVal) {
      this.dateEmit(newVal);
    }
  }
}
</script>
