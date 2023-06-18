<template>
  <div>
    <h3 class="email-header mt-1">{{ mail.headerSubject }}</h3>
    <div v-if="mail" class="email-view mt-2 p-2">
      <p>From: {{ mail.fromAddr }}</p>
      <p>{{ mail.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mail: {
      type: Object,
      default: null,
    }
  }
}
</script>