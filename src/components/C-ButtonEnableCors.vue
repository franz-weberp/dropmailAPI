<template>
  <button @click="openHerokuCors" class="btn btn-primary mx-2">Enable Cors</button>
</template>

<script>
export default {
  data() { return { path: 'https://cors-anywhere.herokuapp.com' }},

  methods: {
    openHerokuCors() {
      window.open(this.path, '_blank', 'noreferrer');
    },
  }
}
</script>
