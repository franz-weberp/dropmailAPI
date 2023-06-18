<template>
  <p class="m-0">Autorefresh in
    <svg height="40" width="40">
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" class="countdown text fade-transition">{{ formattedCountdown }}</text>
      <circle 
        cx="20" cy="20" r="17" stroke="#d3d3d3" stroke-width="3" fill="none" shape-rendering="geometricalPrecision"
      />
      <circle 
        cx="20" cy="20" r="17" stroke="#2196f3" stroke-width="3" fill="none" shape-rendering="geometricalPrecision" transform="rotate(-90 20 20)"
        :stroke-dasharray="circumference" 
        :stroke-dashoffset="-offset"
      /> 
    </svg>
  </p>
</template>

<script>
export default {
  props: {
    countdown: {
      type: Number,
      required: true,
      default: 15
    },
  },
  
  data() {
    return { radius: 17 }
  },

  computed: {
    circumference() { return 2 * Math.PI * this.radius; },
    offset() { return this.circumference - (this.countdown / 15) * this.circumference; },
    formattedCountdown() { return this.countdown.toString().padStart(2, '0') },
  }
}

</script>