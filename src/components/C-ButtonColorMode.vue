<template>
  <button @click="toggleColorMode" class="btn btn-primary"><i class="bi bi-circle-half"></i></button>
</template>

<script>
export default {
  data() { return { darkMode: false }},

  methods: {
    toggleColorMode() {
      this.darkMode = !this.darkMode

      const htmlElement = document.querySelector('html')
      const bodyElement = document.body

      const newTheme = this.darkMode ? 'light' : 'dark'
      
      htmlElement.setAttribute('data-bs-theme', newTheme)
      bodyElement.classList.add('fade-transition')
      bodyElement.classList.toggle('dark-mode', this.darkMode)
    },
  }
}
</script>
