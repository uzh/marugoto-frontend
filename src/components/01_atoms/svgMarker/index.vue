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
      var referenceElement = svgParent.getElementsByClassName('title')[0].children[0];
      console.log(referenceElement.offsetWidth, referenceElement.offsetHeight)
      var refW = referenceElement.offsetWidth;
      var refH = referenceElement.offsetHeight;
      
      this.$refs[`svg-${this.order}`].style.width = refW + 'px';
      this.$refs[`svg-${this.order}`].style.height = refH + 'px';

      let negativeOffset = -17;
      let offsetWidth = refH / 2;
      
      var start = `M32,${negativeOffset}`;
      var topLine = `C${refW / 2},${negativeOffset} ${(refW - 15) - 10},-18 ${refW},0`;
      var topRightCurve = `C${refW + 10},${(refH / 2) / 2} ${refW + 10},${(refH / 2) / 2} ${refW + 10},${refH / 2}`;
      var bottomRightCurve = `C${refW - 56},${refH + 14} ${refW + 50},${refH + 1} ${refW - 62},${refH + 10}`;

      var rightLine = `C${refW + 20 + (refH / 2)},${refH / 2 - 20} ${refW + 20 + (refH / 2)},${refH / 2} ${refW + 20 + (refH / 2)},${refH / 2}`;
      
      
      var bottomLine = `C${0 + 56},${refH + 25} ${0 + 161},${refH + 10} ${20},${refH + 10}`;
      var bottomLeftCurve = `C${-3},${25} ${-5},${1} ${0},${0}`;
      var endLine = `C${35},${-6} ${35},${-5} ${170},${-5}`;

      this.$refs[`path-${this.order}`].setAttribute("d", `${start}
                                                          ${topLine}
                                                          ${topRightCurve}
                                                          ${bottomRightCurve}
                                                          `);
    },
  },
}
</script>


<path d="
  M838.343994,333.744617 
  C953.380593,329.553115 935.964488,328.658744 1052.59692,330.63044 
  C1083.50551,331.152956 1123.78272,330.919536 1153.71089,337.039114 
  C1160.40339,338.407565 1166.24094,346.479593 1166.42966,347.919239 
  C1168.36058,362.648999 1133.77765,371.013639 1102.4735,374.272778 
  C1077.7279,376.849092 1052.45987,378.771217 1027.02146,379.878134 
  C974.641981,382.157353 861.497063,383.905638 815.193701,376.889856 
  C759.145687,368.397585 793.437669,341.428736 839.727454,339.450692 
  C875.790911,337.909637 912.136711,337.676732 948.34134,336.789752" 
  
  id="Path-2" transform="translate(976.310846, 355.757735) rotate(2.000000) translate(-976.310846, -355.757735) "></path>
