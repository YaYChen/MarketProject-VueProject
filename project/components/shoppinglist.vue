<template>
  <div class="layout_center">
    <div class="input_group_div">
      <div class="input_div">
        <el-input
          v-model="barcode"
          placeholder="Input barcode,please..."
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
        :product="item"
        :index="index"
        :key="item.id"
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
      title="购物清单"
      width="50%"
    >
      <div>
        <div class="list_title_div">序号： {{ order.serial }}</div>
      </div>
      <div>
        <el-table
          :data="productList"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称"
            width="180"/>
          <el-table-column
            prop="category"
            label="类别"
            width="180"/>
          <el-table-column
            prop="specification"
            label="规格"/>
          <el-table-column
            prop="price"
            label="单价(￥)"/>
          <el-table-column
            prop="quantity"
            label="数量"/>
          <el-table-column
            prop="totalPrice"
            label="总价(￥)"/>
        </el-table>
      </div>
      <div class="list_footer_div">
        <div class="list_footer_content_div">商品总量：{{ order.totalNumber }}</div>
        <div class="list_footer_content_div">商品总价：{{ order.totalPrice }} ￥</div>
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
import common from '@/services/common.js'

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
      common: common,
      userID: ''
    }
  },
  created() {
    let vm = this
    vm.$axios
      .get('/users')
      .then(function(response) {
        vm.userID = response.data[0].id
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    inputListener: function() {
      var vm = this
      vm.$axios
        .get('/product-ByCode', {
          params: {
            code: vm.barcode
          }
        })
        .then(function(response) {
          var product = response.data
          vm.$store.dispatch('cart/addProductToCart', product)
          vm.barcode = ''
        })
        .catch(function(error) {
          console.log(error)
        })
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
        serial: vm.common.getDateString(date),
        createTime: '',
        createUser: vm.userID,
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
          productID: element.id,
          quantity: element.quantity
        }
        items.push(item)
      })
      return items
    },
    saveOrder() {
      let vm = this
      let postData = JSON.stringify(vm.order)
      vm.$axios
        .post('/create-order', postData, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(response => {
          vm.$message({
            message: 'Success!',
            type: 'success'
          })
          vm.$store.dispatch('cart/clearCart')
          vm.productList = vm.$store.state.cart.items
        })
        .catch(function(error) {
          vm.$message.error(error)
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
