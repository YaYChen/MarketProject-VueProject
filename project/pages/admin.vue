<template>
  <div class="layout_main">
    <app-header
      :activeIndex="activeIndex"
      class="layout_header"/>
    <div class="layout_content">
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">
            <div>
              
            <div/>
          </el-tab-pane>
        </el-tabs>
      </div>
      <app-footer/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'

export default {
  components: {
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

<style scoped>

</style>