<template>
  <div class="tempmail">
    <div class="row">
      <div class="col-12 col-lg-4 col-xl-4"></div>
      <div class="col-12 col-lg-4 col-xl-4">
        <div class="col input-group mb-3 justify-content-md-center">
          <C-InputEmail :value="email"/>
          <C-ButtonCopy @clipBoard="clipBoard"/>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xl-4"></div>
    </div>

    <div class="row row-cols-4">
      <div class="col col-1 col-lg-4"></div>
      <div class="col col-12 col-lg-2 mb-3 d-grid">
        <C-ButtonDelete @generate-new-email="generateNewEmail" />
      </div>
      <div class="col col-12 col-lg-2 mb-3 d-grid">
        <C-ButtonNotification 
          @request-notification-permission="requestNotificationPermission" 
          :notificable="notificable"
        />
      </div>      
      <div class="col col-1 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import CInputEmail from '@components/C-InputEmail.vue'
import CButtonCopy from '@components/C-ButtonCopy.vue'
import CButtonDelete from '@components/C-ButtonDelete.vue'
import CButtonNotification from '@components/C-ButtonNotification.vue'
import { copyToClipboard } from '@/utils/clipBoard/clipboard.js'

export default {
  components: {
    CInputEmail,
    CButtonCopy,
    CButtonDelete,
    CButtonNotification
  },

  props: {
    email: {
      Type: String,
      default: ''
    },
    notificable: {
      type: Boolean,
      default: false,
    }
  },
  
  methods: {
    clipBoard() {
      copyToClipboard(this.email)
        .then(() => { this.$emit('copy-to-clipboard', true, 'Email copied to clipboard', this.email) })
        .catch(() => { this.$emit('copy-to-clipboard', false, 'Error copying email to clipboard', '') });
    },

    generateNewEmail() { this.$emit('generate-new-email', 'delete') },

    requestNotificationPermission() {
      if (("Notification" in window)) { return this.$emit('request-notification-permission', 'permission') }

      alert("This browser does not support desktop notifications.");
    }
  },
}
</script>

<style scoped>
</style>