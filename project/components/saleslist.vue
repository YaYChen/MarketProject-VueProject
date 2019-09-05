<template>
  <div class="layout_center">
    <div class="date_picker_div">
      <el-row>
        <el-col :span="6">
          <div class="date_picker_title_div">{{ $t('datePicker.title') }}: </div>
        </el-col>
        <el-col :span="12">
          <div class="date_picker_content_div">
            <el-date-picker
              v-model="daterange"
              :range-separator="$t('datePicker.rangeSeparator')"
              :start-placeholder="$t('datePicker.startPlaceholder')"
              :end-placeholder="$t('datePicker.endPlaceholder')"
              type="daterange"/>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button 
            type="primary" 
            @click="getListByDate()">{{ $t('button.inquire') }}</el-button>
        </el-col>
      </el-row>
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
            <el-table
              :data="boardlist"
              style="width: 100%">
              <el-table-column
                :label="$t('index')"
                type="index"
                width="100px"
                align="center"/>
              <el-table-column
                :label="$t('product.name')"
                property="product.name"
                width="225px"/>
              <el-table-column
                :label="$t('product.category')"
                property="product.category.name"
                width="225px"/>
              <el-table-column
                :label="$t('product.specification')"
                property="product.specification"
                width="225px"/>
              <el-table-column
                :label="$t('product.quantity')"
                property="nums"
                width="225px"/>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import utils from '@/services/common.js'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      daterange: '',
      activeName: 'first',
      list: [],
      listitem: [],
      showitem: false,
      boardlist: []
    }
  },
  created() {
    let vm = this
    let user = JSON.parse(Cookies.get('user') || null)
    if (user !== null) {
      vm.$store.dispatch('user/addUser', user)
      vm.getAllList()
    } else {
      vm.$router.push({ name: 'login' })
    }
  },
  methods: {
    tabClick(tab, event) {
      let vm = this
      if (tab.name === 'second') {
        if (vm.boardlist.length === 0) {
          vm.getBoardList()
        }
      }
    },
    getAllList() {
      let vm = this
      vm.list = []
      let userId = vm.$store.state.user.userInfo.userId
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .get('/p/get-all-order', {
            headers: {
              Authorization: token
            }
          })
          .then(function(response) {
            vm.list = response.data
            vm.list.forEach(element => {
              element.isActive = false
              element.createTime = utils.getDateStringForShow(
                new Date(element.createTime)
              )
              element.orderItems.forEach(subitem => {
                subitem.product.productPicture = utils.getImgFilePath(
                  subitem.product.productPicture + '&userId=' + userId
                )
              })
            })
            if (vm.list.length > 1) {
              vm.getListItemProducts(vm.list[0].id)
            }
          })
          .catch(function(error) {
            if (error.request && error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$message({
                message: error,
                type: 'warning'
              })
            }
          })
      }
    },
    getListItemProducts(id) {
      let vm = this
      vm.listitem = []
      vm.list.forEach(element => {
        if (element.id === id) {
          element.isActive = true
          vm.listitem = element
        } else {
          element.isActive = false
        }
      })
      vm.showitem = true
    },
    getBoardList() {
      let vm = this
      vm.boardlist = []
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .get('/p/getWholeSalesVolume', {
            headers: {
              Authorization: token
            }
          })
          .then(function(response) {
            vm.boardlist = response.data
          })
          .catch(function(error) {
            if (error.request && error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$message({
                message: error,
                type: 'warning'
              })
            }
          })
      }
    },
    getListByDate() {
      let vm = this
      if (utils.isEmpty(vm.daterange)) {
        vm.$message({
          message: 'Please pick date...',
          type: 'warning'
        })
      } else {
        let dateParam = {
          start: utils.getDateTimeString(vm.daterange[0]),
          end: utils.getDateTimeString(vm.daterange[1])
        }
        let token = vm.$store.state.user.userInfo.token.token
        if (token === undefined || token === '') {
          vm.$message({
            message: 'No auth',
            type: 'warning'
          })
          vm.$router.push({ name: 'login' })
        } else {
          let userId = vm.$store.state.user.userInfo.userId
          let postData = JSON.stringify(dateParam)
          vm.$axios
            .post('/p/search-order-by-date', postData, {
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: token
              }
            })
            .then(function(response) {
              vm.list = response.data
              vm.list.forEach(element => {
                element.isActive = false
                element.createTime = utils.getDateStringForShow(
                  new Date(element.createTime)
                )
                element.orderItems.forEach(subitem => {
                  subitem.product.productPicture = utils.getImgFilePath(
                    subitem.product.productPicture + '&userId=' + userId
                  )
                })
              })
              if (vm.list.length > 1) {
                vm.getListItemProducts(vm.list[0].id)
              }
            })
            .catch(function(error) {
              if (error.request && error.request.status === 401) {
                vm.$message({
                  message: 'No auth',
                  type: 'warning'
                })
                vm.$router.push({ name: 'login' })
              } else {
                vm.$message({
                  message: error,
                  type: 'warning'
                })
              }
            })
        }
      }
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
.el-button {
  height: 40px;
  width: 150px;
}
.el-button--primary {
  color: #fff;
  background-color: black;
  border-color: black;
}
.el-button--primary:hover {
  color: black;
  background-color: white;
  border-color: black;
}
</style>
