<template>
  <div class="layout_main">
    <app-header :activeIndex="activeIndex"/>
    <sales-list/>
    <app-footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import SalesList from '@/components/saleslist.vue'

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'sales-list': SalesList
  },
  data() {
    return {
      activeIndex: '3-2'
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.layout_main {
  width: 100%;
  margin: 0 auto;
  height: 100%;
}
</style>
