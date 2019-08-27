<template>
  <div class="layout_main">
    <app-header
      :activeIndex="activeIndex"
      class="layout_header"/>
    <div class="layout_content">
      <supplier-list/>
      <app-footer/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import SupplierList from '@/components/supplierlist.vue'
export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'supplier-list': SupplierList
  },
  data: function() {
    return {
      activeIndex: '3-4'
    }
  },
  created() {},
  methods: {}
}
</script>

<style>
.layout_main {
  width: 100%;
  margin: 0 auto;
  height: 100%;
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
