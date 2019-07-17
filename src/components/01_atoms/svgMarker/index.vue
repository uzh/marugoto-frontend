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
      
      var refW = referenceElement.offsetWidth;
      var refH = referenceElement.offsetHeight;
      
      this.$refs[`svg-${this.order}`].style.width = refW + 'px';
      this.$refs[`svg-${this.order}`].style.height = refH + 'px';
      
      var start = `M32,-17`;
      var topLine = `C${refW / 2},-17 ${(refW - 15) - 10},-18 ${refW},0`;
      var topRightCurve = `C${refW + 10},${(refH / 2) / 2} ${refW + 10},${(refH / 2) / 2} ${refW + 10},${refH / 2}`;
      var bottomRightCurve = `C${refW + 10},${refH / 2 + 10} ${refW + 10},${refH} ${refW},${refH + 10}`;
      var bottomLine = `C${refW},${refH + 20} ${refW / 3},${refH + 30} 10,${refH + 10}`;
      var bottomLeftCurve = `C-10,${refH} -10,${refH / 2}  -10,${refH / 2}`;
      var endLine = `C-10,-5 0,-5 ${refW / 2},-5`;
      
      this.$refs[`path-${this.order}`].setAttribute("d", `${start}
                                                          ${topLine}
                                                          ${topRightCurve}
                                                          ${bottomRightCurve}
                                                          ${bottomLine}
                                                          ${bottomLeftCurve}
                                                          ${endLine}
                                                          `);
    },
  },
}
</script>
