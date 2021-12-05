<template>
  <div class="logo">
    <svg-nuxt-logo />
  </div>
</template>

<script>
import SvgNuxtLogo from '~/assets/svg/nuxt-logo.svg?inline'

export default {
  components: {
    SvgNuxtLogo
  }
}
</script>

<style lang="scss" scoped>
  .logo svg {
    height: 4em;
  }
</style>
