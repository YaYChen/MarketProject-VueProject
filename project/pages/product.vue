<template>
  <div class="layout_main">
    <app-header :activeIndex="activeIndex"/>
    <edit-product/>
    <app-footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import EditProduct from '@/components/editproduct.vue'

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'edit-product': EditProduct
  },
  data: function() {
    return {
      activeIndex: '3-1'
    }
  },
  methods: {}
}
</script>

<style>
.layout_main {
  width: 100%;
  margin: 0 auto;
  height: 100%;
}
</style>
