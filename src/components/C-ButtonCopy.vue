<template>
  <button @click="clipBoard" class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="bi bi-files"></i> Copy</button>
</template>

<script>
export default {
  methods: {
    clipBoard() { return this.$emit("clipBoard")}
  }
}
</script>