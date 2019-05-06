<template>
  <div class="layout_center">
    <div class="date_picker_div">
      <div class="date_picker_title_div">日期选择: </div>
      <div class="date_picker_content_div">
        <el-date-picker
          v-model="daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"/>
      </div>
    </div>
    <div class="content_div">
      <el-tabs 
        v-model="activeName"
        @tab-click="tabClick">
        <el-tab-pane 
          label="历史清单"
          name="first">
          <div class="tab_content_div">
            历史清单
          </div>
        </el-tab-pane>
        <el-tab-pane 
          label="历史销量"
          name="second">
          <div class="tab_content_div">
            历史销量
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daterange: '',
      activeName: 'first'
    }
  },
  created() {},
  methods: {
    tabClick(tab, event) {
      console.log(tab.name)
    }
  }
}
</script>

<style scoped>
.layout_center {
  width: 100%;
  min-height: 800px;
  margin: 10px auto;
}
.date_picker_div {
  margin: 10px auto;
  width: 1000px;
  padding: 10px;
  border-bottom: 5px solid black;
}
.date_picker_title_div {
  width: 200px;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  font-family: 'Microsoft YaHei';
  text-align: left;
  float: left;
}
.date_picker_content_div {
  height: 40px;
  line-height: 40px;
}
.content_div {
  margin: 10px auto;
  width: 1000px;
}
.tab_content_div {
  height: 600px;
}
</style>
