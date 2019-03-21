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
      id="product_container" 
      class="product_list_div"
    >
      <product-component
        v-if="showProduct"
        ref="productview"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from '@/components/product.vue'

export default {
  components: {
    'product-component': Product
  },
  data: function() {
    return {
      showProduct: false,
      product: '',
      barcode: ''
    }
  },
  created: function() {},
  methods: {
    inputListener: function() {
      var vm = this
      this.$axios
        .get('/product-ByCode', {
          params: {
            code: vm.barcode
          }
        })
        .then(function(response) {
          if (
            response.data === null ||
            response.data === undefined ||
            response.data === ''
          ) {
            vm.$message({
              message: vm.$t('message.productNotFound'),
              type: 'warning'
            })
            vm.barcode = ''
          } else {
            vm.showProduct = true
            vm.product = response.data
            vm.barcode = ''
          }
        })
        .catch(function(error) {
          console.log(error)
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

.product_list_div {
  width: 1000px;
  height: auto;
  margin: 10px auto;
}
</style>
