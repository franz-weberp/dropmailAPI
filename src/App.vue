<template>
  <div id="app">
    <div class="container p-0 d-flex justify-content-end">
      <div class="flex-wrap d-flex align-content-center">After enable the cors Refresh the page</div>
      <CButtonEnableCors/>
      <CButtonColorMode/>
    </div>
    <HomeView />
  </div>
</template>

<script>
import CButtonEnableCors from '@components/C-ButtonEnableCors.vue'
import CButtonColorMode from '@components/C-ButtonColorMode.vue'
import HomeView from './views/HomeView.vue'

export default {
	components: {
    CButtonEnableCors,
    CButtonColorMode,
		HomeView,
  },
}
</script>

<style>
.container { margin: 25px auto 0 auto }
</style>