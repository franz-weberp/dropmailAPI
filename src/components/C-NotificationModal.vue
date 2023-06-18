<template>
  <div class="modal fade" :id="modalId" tabindex="-1" ref="modalElement">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ headerNotification }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
          <button 
            type="button" 
            class="btn" 
            data-bs-dismiss="modal" 
            @click="acceptModal" 
            :class="getTypeClassButton"
          >
            {{ buttonConfirm }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: {
    modalId: {
      type: String,
      required: true
    },
    headerNotification: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    buttonConfirm: {
      type: String,
      required: true
    },
    caseModalNotification: {
      type: String,
      required: true
    },
    deleteEmail: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getTypeClassButton() {
      return {
        'btn-primary': this.deleteEmail === false,
        'btn-danger': this.deleteEmail === true
      };
    },
  },

  methods: {
    show() {
      const modal = new Modal(this.$refs.modalElement)
      modal.show()
    },

    acceptModal() { this.$emit('modal-accepted', this.caseModalNotification) },
  },
};
</script>
