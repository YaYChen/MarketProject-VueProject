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
            <el-row>
              <el-col :span="8">
                <div class="list_summary_div">
                  <div 
                    v-for="item in list" 
                    :key="item.id"
                    class="summary_content_div"
                    @click="getListItemProducts(item.id)">
                    <div>
                      <span class="summary_detail_title_span">Serial: </span>
                      <span class="summary_detail_content_span">{{ item.serial }}</span>
                    </div>
                    <el-row>
                      <el-col :span="12">
                        <div>
                          <span class="summary_detail_title_span">User: </span>
                          <span class="summary_detail_content_span">{{ item.createUser.username }}</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div>
                          <span class="summary_detail_title_span">Total Price: </span>
                          <span class="summary_detail_content_span">{{ item.totalPrice }}</span>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="summary_detail_date_div">{{ item.createTime }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="list_detial_div">
                  右
                </div>
              </el-col>
            </el-row>
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
import utils from '@/services/common.js'

export default {
  data() {
    return {
      daterange: '',
      activeName: 'first',
      list: [],
      listitem: []
    }
  },
  created() {
    let vm = this
    vm.getAllList()
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab.name)
    },
    getAllList() {
      let vm = this
      vm.$axios
        .get('/get-all-order')
        .then(function(response) {
          vm.list = response.data
          vm.list.forEach(element => {
            element.createTime = utils.getDateStringForShow(
              new Date(element.createTime)
            )
          })
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getListItemProducts(id) {
      let vm = this
      vm.list.forEach(element => {
        if (element.id === id) {
          vm.listitem = element.orderItems
        }
      })
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
  height: auto;
}
.list_summary_div {
  height: 600px;
  overflow-y: auto;
}
.list_detial_div {
  height: 600px;
  overflow-y: auto;
}
.summary_detail_date_div {
  margin-top: 5px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  font-family: 'Microsoft YaHei';
  text-align: right;
}
.summary_detail_title_span {
  margin-top: 5px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  font-family: 'Microsoft YaHei';
  color: gray;
}
.summary_detail_content_span {
  margin-top: 5px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  font-family: 'Microsoft YaHei';
}
.summary_content_div {
  padding-bottom: 5px;
  border-bottom: 2px solid lightgray;
  cursor: pointer;
}
.summary_content_div:hover {
  border-bottom: 2px solid black;
}
</style>
