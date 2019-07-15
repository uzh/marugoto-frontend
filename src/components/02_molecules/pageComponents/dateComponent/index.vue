<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon'

export default {
  name: 'DateComponent',
  props: [ 'exerciseId', 'pickerMode', 'existingDate' ],
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
      datesFormated: [],
    }
  },
  mounted: function() {
    // console.log('slected: ', this.selectedDate)
    if( this.existingDate != undefined ){
      let from = this.existingDate.split(".")
      this.selectedDate = new Date(from[2], from[1] - 1, from[0]);
    }
  },
  methods: {
    emitDate: function(date){
      this.$emit('emitDateChange', date, this.stateID);
    },
    dateEmit: function(event) {
      if(this.pickerMode == 'range') {
        if(this.datesFormated.length >= 2) {
          this.datesFormated = [];
        }
        let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
        let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
        this.datesFormated.push(`${d}.${m}.${event.year}`);
        this.emitDate(this.datesFormated);
      } else {
        let d = event.day.toString().length == 1 ? `0${event.day}` : event.day;
        let m = event.month.toString().length == 1 ? `0${event.month}` : event.month;
        this.dateFormated = `${d}.${m}.${event.year}`;
        this.emitDate(this.dateFormated);
      }
    },
  },
}
</script>
