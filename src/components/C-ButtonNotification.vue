<template>
  <button @click="requestPermission" class="col btn btn-primary"><i :class="'bi ' + currentIcon"></i> Notification</button>
</template>

<script>
export default {
  props: {
    notificable: {
      type: Boolean,
      required: true,
      default: false,
    }
  },

  data () {
    return { currentIcon: 'bi-bell' }
  },

  watch: {
    notificable(changeValueNotificable) {
      if (changeValueNotificable) { this.currentIcon = 'bi-bell-fill' } 
      else { this.currentIcon = 'bi-bell' }
    }
  },

  methods: {
    requestPermission() {
      if ("Notification" in window) { return this.$emit("request-notification-permission") }
      alert("This browser does not support desktop notifications.")
    },
    
    changeIcon() { this.currentIcon = this.currentIcon === 'bi-bell' ? 'bi-bell-fill' : 'bi-bell' },
  }
}
</script>