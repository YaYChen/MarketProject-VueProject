<template>
  <div class="layout_main">
    <div>
      
    </div>
    <app-footer/>
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'

export default {
  components: {
    'app-footer': Footer
  },
  data: function() {
    return {
      user: ''
    }
  },
  methods: {}
}
</script>

<style>
.layout_main {
  width: 100%;
  height: auto;
}
</style>