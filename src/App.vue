<template>
  <div id="app">
    <div class="container p-0 d-flex justify-content-end"><CButtonColorMode/></div>
    <HomeView />
  </div>
</template>

<script>
import CButtonColorMode from '@components/C-ButtonColorMode.vue'
import HomeView from './views/HomeView.vue'

export default {
	components: {
    CButtonColorMode,
		HomeView,
  },
}
</script>

<style>
.container { margin: 25px auto 0 auto }
</style>