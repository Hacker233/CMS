<template>
  <svg
    :class="iconStyle"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: 'IconSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconStyle: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#${this.iconClass}`
    }
  }
}
</script>