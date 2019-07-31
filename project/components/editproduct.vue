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
      <product-editer-component
        v-if="showProduct"
        ref="product_view"
        :product="product"
        :update="update"
        :onCancel="cancel"
        @disableEditer="disableEditer"
      />
    </div>
  </div>
</template>

<script>
import ProductEditer from '@/components/productediter.vue'

export default {
  components: {
    'product-editer-component': ProductEditer
  },
  data() {
    return {
      showProduct: false,
      product: '',
      update: false,
      barcode: ''
    }
  },
  created() {},
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
            if (response.data === '') {
              vm.update = false
              vm.product = {
                id: 0,
                code: vm.barcode,
                name: '',
                category: { id: 1, name: '烟草' },
                specification: '',
                productPicture: '',
                purchasePrice: '',
                price: ''
              }
              alert('The product is not exit,please add...')
            } else {
              vm.update = true
              vm.product = response.data
            }
            vm.barcode = ''
            vm.showProduct = true
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
    disableEditer: function() {
      var vm = this
      vm.showProduct = false
      vm.product = ''
      vm.barcode = ''
    },
    cancel: function() {
      var vm = this
      vm.showProduct = false
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
