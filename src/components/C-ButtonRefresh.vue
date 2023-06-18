<template>
  <button @click="refresh" class="btn btn-outline-success" :disabled="disabled">
    <p class="m-0"><i class="bi bi-arrow-clockwise"></i> Refresh</p>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: true,
      default: false
    },
  },

  methods: {
    refresh() { return this.$emit("refresh") }
  }
}
</script>