<template src="./template.html"></template>

<script>

export default {
  name: 'SvgMarker',
  props: [ 'order' ],
  mounted: function() {
    this.drawSVG();
  },
  methods: {
    drawSVG: function() {
      // var svgParent = this.$refs[`svg-${this.order}`].parentElement.parentElement;
      // var referenceElement = svgParent.getElementsByClassName('title')[0].children[0];
      // console.log(referenceElement.offsetWidth, referenceElement.offsetHeight)
      // var refW = referenceElement.offsetWidth;
      // var refH = referenceElement.offsetHeight;
      
      // this.$refs[`svg-${this.order}`].style.width = refW + 'px';
      // this.$refs[`svg-${this.order}`].style.height = refH + 'px';

      // let negativeOffset = -17;
      // let offsetWidth = refH / 2;
      
      // var start = `M32,${negativeOffset}`;
      // var topLine = `C${refW / 2},${negativeOffset} ${(refW - 15) - 10},-18 ${refW},0`;
      // var topRightCurve = `C${refW + 10},${(refH / 2) / 2} ${refW + 10},${(refH / 2) / 2} ${refW + 10},${refH / 2}`;
      // var bottomRightCurve = `C${refW - 56},${refH + 14} ${refW + 50},${refH + 1} ${refW - 62},${refH + 10}`;

      // var rightLine = `C${refW + 20 + (refH / 2)},${refH / 2 - 20} ${refW + 20 + (refH / 2)},${refH / 2} ${refW + 20 + (refH / 2)},${refH / 2}`;
      
      
      // var bottomLine = `C${0 + 56},${refH + 25} ${0 + 161},${refH + 10} ${20},${refH + 10}`;
      // var bottomLeftCurve = `C${-3},${25} ${-5},${1} ${0},${0}`;
      // var endLine = `C${35},${-6} ${35},${-5} ${170},${-5}`;

      // this.$refs[`path-${this.order}`].setAttribute("d", `${start}
      //                                                     ${topLine}
      //                                                     ${topRightCurve}
      //                                                     ${bottomRightCurve}
      //                                                     `);
    },
  },
}
</script>
