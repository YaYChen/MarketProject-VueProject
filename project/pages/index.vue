<template>
  <div class="layout_main">
    <app-header
      :activeIndex="activeIndex"
      class="layout_header"/>
    <div class="layout_content">
      <search-product-component/>
      <app-footer/>
    </div>
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
.layout_header {
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 9;
}
.layout_content {
  margin-top: 100px;
}
</style>
