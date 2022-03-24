<template>
  <svg
    width="22"
    height="17"
    viewBox="0 0 22 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="$emit('click')"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 17C10.734 17 10.48 16.895 10.292 16.706L2.52499 8.926C0.488986 6.886 0.488986 3.567 2.52499 1.527C3.50799 0.543 4.82099 0 6.21999 0C7.61899 0 8.93199 0.543 9.91499 1.527L11 2.614L12.084 1.528C13.068 0.543 14.381 0 15.78 0C17.179 0 18.492 0.543 19.475 1.527C21.511 3.567 21.511 6.886 19.476 8.926L11.708 16.707C11.52 16.895 11.266 17 11 17Z"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
  props: {
    isLiked: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    fill() {
      return this.isLiked ? 'red' : 'white'
    }
  }
}
</script>

<style>
</style>