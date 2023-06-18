<template>
  <div class="toast align-items-center toast-bottom-right" role="alert" aria-live="assertive" aria-atomic="true" :class="{ 'bg-success': clipState, 'bg-danger': !clipState }">
    <div class="d-flex">
      <div class="toast-body" ref="toastBody">
        {{ message }}
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap';

export default {
  props: {
    clipState: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    show() {
      const toastEl = this.$el
      const toast = new Toast(toastEl)
      toast.show()
    },
  },
};
</script>

<style scoped>
.toast-bottom-right {
  position: fixed;
  bottom: 32px;
  right: 32px;
}

/* Add your custom styles here */
</style>