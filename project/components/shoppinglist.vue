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
    <div class="settlement_div">
      <div class="button-div">
        <el-button>Settlement</el-button>
        <el-button>Cancle</el-button>
      </div>
    </div>
    <el-dialog 
      :visible.sync="dialogVisible"
      title="Tips"
      width="30%"
    >
      <span>test</span>
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

export default {
  components: {
    'listitem-component': ListItem
  },
  data() {
    return {
      productList: [],
      handleIndex: -1,
      dialogVisible: false,
      barcode: ''
    }
  },
  methods: {
    inputListener: function() {
      var vm = this
      vm.handleIndex = -1
      this.$axios
        .get('/product-ByCode', {
          params: {
            code: vm.barcode
          }
        })
        .then(function(response) {
          var product = response.data
          vm.handleIndex = vm.getIndexInArray(product.id)
          if (vm.handleIndex === -1) {
            var item = {
              id: product.id,
              name: product.name,
              category: product.category,
              Specification: product.Specification,
              productPicture: product.productPicture,
              price: parseFloat(product.price),
              totalPrice: parseFloat(product.price),
              quantity: 1
            }
            vm.productList[vm.productList.length] = item
          } else {
            vm.productList[vm.handleIndex].quantity++
            vm.productList[vm.handleIndex].totalPrice =
              vm.productList[vm.handleIndex].quantity * vm.product.price
          }
          vm.barcode = ''
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getIndexInArray: function(id) {
      var vm = this
      if (vm.productList.length === 0) {
        return -1
      }
      for (var i = 0; i < vm.productList.length; i++) {
        if (id === vm.productList[i].id) {
          return i
        }
      }
      return -1
    },
    dialogConfirm: function() {
      var vm = this
      vm.productList.splice(vm.handleIndex, 1)
      vm.dialogVisible = false
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
</style>
