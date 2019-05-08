<template>
  <div class="layout_center">
    <div class="date_picker_div">
      <div class="date_picker_title_div">{{ $t('datePicker.title') }}: </div>
      <div class="date_picker_content_div">
        <el-date-picker
          v-model="daterange"
          :range-separator="$t('datePicker.rangeSeparator')"
          :start-placeholder="$t('datePicker.startPlaceholder')"
          :end-placeholder="$t('datePicker.endPlaceholder')"
          type="daterange"/>
      </div>
    </div>
    <div class="content_div">
      <el-tabs 
        v-model="activeName"
        @tab-click="tabClick">
        <el-tab-pane 
          :label="$t('tabPanel.historyList')"
          name="first">
          <div class="tab_content_div">
            <el-row>
              <el-col :span="8">
                <div class="list_summary_div">
                  <div 
                    v-for="item in list" 
                    :key="item.id"
                    :class="{ active: item.isActive }"
                    class="summary_content_div"
                    @click="getListItemProducts(item.id)">
                    <div>
                      <span class="summary_detail_title_span">{{ $t('order.serial') }}: </span>
                      <span class="summary_detail_content_span">{{ item.serial }}</span>
                    </div>
                    <el-row>
                      <el-col :span="12">
                        <div>
                          <span class="summary_detail_title_span">{{ $t('order.createUser') }}: </span>
                          <span class="summary_detail_content_span">{{ item.createUser.username }}</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div>
                          <span class="summary_detail_title_span">{{ $t('order.totalPrice') }}: </span>
                          <span class="summary_detail_content_span">{{ item.totalPrice }}</span>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="summary_detail_date_div">{{ item.createTime }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="16">
                <div 
                  v-if="showitem"
                  class="list_detial_div">
                  <div class="list_item_title_div">
                    <div class="list_item_content_div">{{ $t('order.serial') }}: {{ listitem.serial }}</div>
                    <div class="list_item_content_div">{{ $t('order.createTime') }}: {{ listitem.createTime }}</div>
                    <div class="list_item_content_div">{{ $t('order.createUser') }}: {{ listitem.createUser.username }}</div>
                  </div>
                  <div 
                    v-for="item in listitem.orderItems" 
                    :key="item.id"
                    class="detial_content_div">
                    <el-row>
                      <el-col :span="4">
                        <div>
                          <img
                            :src="item.product.productPicture"
                            class="detial_product_img">
                        </div>
                      </el-col>
                      <el-col :span="10">
                        <div>
                          <span class="detial_product_info_title_span">{{ $t('product.name') }}:</span>
                          <span class="detial_product_info_content_span">{{ item.product.name }}</span>
                        </div>
                        <div>
                          <span class="detial_product_info_title_span">{{ $t('product.category') }}:</span>
                          <span class="detial_product_info_content_span">{{ item.product.category.name }}</span>
                        </div>
                        <div>
                          <span class="detial_product_info_title_span">{{ $t('product.specification') }}:</span>
                          <span class="detial_product_info_content_span">{{ item.product.specification }}</span>
                        </div>
                      </el-col>
                      <el-col :span="10">
                        <div class="detial_product_price_div">
                          {{ item.quantity }} &times; {{ item.product.price }} ￥
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="detial_total_info_div">
                    <div class="total_num_div">{{ $t('order.totalQuantity') }}：{{ listitem.totalNumber }}</div>
                    <div class="total_price_div">{{ $t('order.totalPrice') }}：{{ listitem.totalPrice }} ￥</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane 
          :label="$t('tabPanel.historySales')"
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
      listitem: [],
      showitem: false
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
      vm.list = []
      vm.$axios
        .get('/get-all-order')
        .then(function(response) {
          vm.list = response.data
          vm.list.forEach(element => {
            element.isActive = false
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
      vm.listitem = []
      vm.list.forEach(element => {
        if (element.id === id) {
          element.isActive = true
          vm.listitem = element
          vm.listitem.orderItems.forEach(subitem => {
            subitem.product.productPicture = utils.getImgFilePath(
              subitem.product.productPicture
            )
          })
        } else {
          element.isActive = false
        }
      })
      vm.showitem = true
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
  width: 250px;
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
  margin-right: 5px;
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
  margin: 5px;
  border-right: 2px solid lightgray;
  cursor: pointer;
}
.summary_content_div:hover {
  border-right: 3px solid black;
  box-shadow: 2px 2px 5px lightgray;
}
.active {
  border-right: 3px solid black;
}
.detial_product_img {
  height: 100px;
  width: 100px;
}
.detial_product_info_title_span {
  height: 25px;
  line-height: 25px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  color: gray;
}
.detial_product_info_content_span {
  height: 25px;
  line-height: 25px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  color: black;
}
.detial_product_price_div {
  height: 100%;
  line-height: 100%;
  font-family: 'Microsoft YaHei';
  font-size: 30px;
  color: green;
}
.detial_content_div {
  margin: 5px;
  border-bottom: 2px dashed gray;
}
.detial_total_info_div {
  text-align: right;
}
.total_num_div {
  margin-right: 5px;
  height: 25px;
  line-height: 25px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  color: black;
}
.total_price_div {
  margin-right: 5px;
  height: 30px;
  line-height: 30px;
  font-family: 'Microsoft YaHei';
  font-size: 25px;
  color: black;
}
.list_item_title_div {
  margin: 5px;
  border-bottom: 2px dashed gray;
}
.list_item_content_div {
  margin: 5px;
  height: 25px;
  line-height: 25px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  color: black;
}
</style>
