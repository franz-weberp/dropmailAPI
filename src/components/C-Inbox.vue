<template>
  <div class="list border-top">
    <h2 class="m-1">Inbox</h2>
    <ul class="email-list border p-2 m-1">
      <li v-for="mail in mails" :key="mail.downloadUrl" @click="selectMail(mail)" class="border-bottom">
        <h3 class="text-truncate">{{ mail.headerSubject }}</h3>
        <p class="text-truncate m-1">from: {{ mail.fromAddr }}</p>
        <p class="text-truncate m-1">{{ mail.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    mails: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectMail(mail) {
      this.$emit('select-mail', mail);
    },
  },
};
</script>

<style>
.email-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 33ch;
}
</style>