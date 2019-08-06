<template>
  <div class="layout_center">
    <div class="input_group_div">
      <div class="input_div">
        <el-input
          v-model="barcode"
          :placeholder="$t('input.placeHolder')"
          @keyup.enter.native="inputListener"
        >
          <el-button 
            slot="append" 
            icon="el-icon-search"
            @click="inputListener"
          />
        </el-input>
      </div>
    </div>
    <div 
      id="list_container" 
      class="shopping_list_div"
    >
      <listitem-component
        v-for="(item, index) in productList"
        :item="item"
        :key="index"
      />
    </div>
    <div
      v-if="productList.length > 0"
      class="settlement_div">
      <div class="button-div">
        <el-button @click="settlement">{{ $t('button.settlement') }}</el-button>
        <el-button >{{ $t('button.cancel') }}</el-button>
      </div>
    </div>

    <el-dialog 
      :visible.sync="dialogVisible"
      :title="$t('dialogTitle.shoppingList')"
      width="50%"
    >
      <div>
        <div class="list_title_div">{{ $t('order.serial') }}： {{ order.serial }}</div>
      </div>
      <div>
        <el-table
          :data="productList"
          style="width: 100%">
          <el-table-column
            :label="$t('product.name')"
            prop="product.name"/>
          <el-table-column
            :label="$t('product.category')"
            prop="product.category.name"/>
          <el-table-column
            :label="$t('product.specification')"
            prop="product.specification"/>
          <el-table-column
            :label="$t('product.price')+'(￥)'"
            prop="product.price"/>
          <el-table-column
            :label="$t('product.quantity')"
            prop="quantity"/>
          <el-table-column
            :label="$t('product.totalPrice')+'(￥)'"
            prop="totalPrice"/>
        </el-table>
      </div>
      <div class="list_footer_div">
        <div class="list_footer_content_div">{{ $t('order.totalQuantity') }}：{{ order.totalNumber }}</div>
        <div class="list_footer_content_div">{{ $t('order.totalPrice') }}：{{ order.totalPrice }} ￥</div>
      </div>
      <span 
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button 
          type="primary" 
          @click="dialogConfirm"
        >{{ $t('button.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ListItem from '@/components/listitem.vue'
import utils from '@/services/common.js'

export default {
  components: {
    'listitem-component': ListItem
  },
  data() {
    return {
      productList: this.$store.state.cart.items,
      dialogVisible: false,
      barcode: '',
      order: {},
      userID: 1
    }
  },
  created() {
    let vm = this
    let userId = vm.$store.state.user.user.userId
    if (userId === undefined || userId === '') {
      vm.$message({
        message: 'No auth',
        type: 'warning'
      })
      vm.$router.push({ name: 'login' })
    } else {
      vm.userID = userId
    }
  },
  methods: {
    inputListener: function() {
      var vm = this
      let token = vm.$store.state.user.user.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .get('/p/product-ByCode', {
            headers: {
              Authorization: token
            },
            params: {
              code: vm.barcode
            }
          })
          .then(function(response) {
            let product = response.data
            if (
              response.data === null ||
              response.data === undefined ||
              response.data === ''
            ) {
              vm.$message({
                message: vm.$t('message.productNotFound'),
                type: 'warning'
              })
            } else {
              vm.$store.dispatch('cart/addProductToCart', product)
            }
            vm.barcode = ''
          })
          .catch(function(error) {
            if (error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            }
            vm.$message({
              message: error,
              type: 'warning'
            })
          })
      }
    },
    dialogConfirm: function() {
      var vm = this
      vm.saveOrder()
      vm.dialogVisible = false
    },
    settlement: function() {
      let vm = this
      vm.getOrder()
      vm.dialogVisible = true
    },
    getOrder() {
      let vm = this
      vm.$store.dispatch('cart/getTotalPrice')
      vm.$store.dispatch('cart/getTotalNumber')
      let date = new Date()
      vm.order = {
        serial: utils.getDateString(date),
        createTime: '',
        createUser: { id: vm.userID },
        status: 'Done',
        totalPrice: vm.$store.state.cart.totalPrice,
        totalNumber: vm.$store.state.cart.totalNumber,
        orderItems: vm.getOrderItems()
      }
    },
    getOrderItems() {
      let vm = this
      let items = []
      vm.productList.forEach(element => {
        let item = {
          orderID: '',
          product: element.product,
          quantity: element.quantity,
          totalPrice: element.totalPrice
        }
        items.push(item)
      })
      return items
    },
    saveOrder() {
      let vm = this
      let postData = JSON.stringify(vm.order)
      let token = vm.$store.state.user.user.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .post('/p/create-order', postData, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: token
            }
          })
          .then(response => {
            vm.$store.dispatch('cart/clearCart')
            vm.productList = vm.$store.state.cart.items
            vm.$message({
              message: vm.$t('message.settlementSuccess'),
              type: 'success'
            })
          })
          .catch(function(error) {
            if (error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            }
            vm.$message({
              message: error,
              type: 'warning'
            })
          })
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

.input_group_div {
  width: 1000px;
  height: auto;
  margin: 10px auto;
  border-bottom: 2px solid black;
  display: block;
}

.input_div {
  margin: 5px 0 5px 0;
}

.shopping_list_div {
  width: 1000px;
  height: auto;
  margin: 10px auto;
}

.settlement_div {
  margin: 10px auto;
  width: 1000px;
  border-top: 2px solid black;
  text-align: right;
}

.button-div {
  margin: 5px;
}

.list_title_div {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
}

.list_footer_div {
  margin-top: 5px;
  border-top: 2px solid black;
}

.list_footer_content_div {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-family: 'Microsoft YaHei';
}
</style>
