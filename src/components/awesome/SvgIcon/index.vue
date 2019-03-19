<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return `svg-icon ${this.iconClass}`;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.svg-icon {
  margin-right: 5px;
  width: 1em;
  height: 1em;
  // vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-icon {
  &.dots {
    width: 4px;
    height: 4px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
