<template>
  <input
    name="temporaryEmail"
    type="text" 
    class="form-control fade-transition" 
    :value="email" 
    placeholder="temporary email: something@email.com" 
    aria-label="temporary email: something@email.com" 
    aria-describedby="button-addon2"
  />
</template>

<script>
export default{
  props: {
    email: {
      Type: String,
      default: ''
    },
  }
}
</script>