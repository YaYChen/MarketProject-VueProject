<template>
  <div class="layout_main">
    <app-header :activeIndex="activeIndex"/>
    <search-product-component/>
    <app-footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import SearchProduct from '@/components/searchproduct.vue'
export default {
  components: {
    'search-product-component': SearchProduct,
    'app-header': Header,
    'app-footer': Footer
  },
  data: function() {
    return {
      activeIndex: '1'
    }
  },
  created() {},
  methods: {}
}
</script>

<style>
.layout_main {
  width: 100%;
  height: auto;
}
</style>
