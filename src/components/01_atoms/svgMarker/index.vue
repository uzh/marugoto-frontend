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
      var svgParent = this.$refs[`svg-${this.order}`].parentElement.parentElement;
      var referenceElement = svgParent.getElementsByClassName('title')[0];

      var refW = referenceElement.clientWidth;
      var refH = referenceElement.clientHeight;

      
      
      var start = `M32,-10`;
      var topLine = `C${refW - 70},-12 ${refW - 80},-11 ${refW},-13`;
      var topRightCurve = `C${refW},-12 ${refW + 50},-13 ${refW + 21},${refH}`;
      var rightLine = `C${refW},-12 ${refW + 50},-13 ${refW + 21},${refH}`;
      var bottomRightCurve = `C${refW - 56},${refH + 14} ${refW + 50},${refH + 1} ${refW - 62},${refH + 10}`;
      var bottomLine = `C${0 + 56},${refH + 25} ${0 + 161},${refH + 10} ${20},${refH + 10}`;
      var bottomLeftCurve = `C${-3},${25} ${-5},${1} ${0},${0}`;
      var leftLine = `C${refW},-12 ${refW + 50},-13 ${refW + 21},${refH}`;
      var endLine = `C${35},${-6} ${35},${-5} ${170},${-5}`;

      this.$refs[`path-${this.order}`].setAttribute("d", `${start}
                                                          ${topLine}
                                                          ${topRightCurve}
                                                          ${bottomRightCurve}
                                                          ${bottomLine}
                                                          ${bottomLeftCurve}
                                                          ${endLine}`);
    },
  },
}
</script>
