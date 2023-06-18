<template>
  <button @click="generateNewEmail" class="col btn btn-danger"><i class="bi bi-trash"></i> Delete</button>
</template>

<script>
export default {
  methods: {
    generateNewEmail() { return this.$emit("generate-new-email")}
  }
}
</script>