<template>
  <div class="main_div">
    <el-row>
      <el-col :span="3">
        <div class="img_div">
          <img
            :src="imgSrc"
            class="img_picture">
        </div>
      </el-col>
      <el-col :span="10">
        <div class="detial_div">
          <div class="product_detial_div">{{ $t('product.name') }}: {{ item.product.name }}</div>
          <div class="product_detial_div">{{ $t('product.category') }}: {{ item.product.category.name }}</div>
          <div class="product_detial_div">{{ $t('product.specification') }}: {{ item.product.specification }}</div>
          <div class="product_detial_div"/>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="settlement_div">
          <el-row>
            <el-col :span="12">
              <div class="price_div">
                {{ item.totalPrice }} ￥
              </div>
            </el-col>
            <el-col :span="12">
              <div class="quantity_div">
                <el-row>
                  <el-col :span="6">
                    <el-button @click="addQuantity">+</el-button>
                  </el-col>
                  <el-col :span="12">
                    <div class="price_div">
                      {{ item.quantity }}
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="reduceQuantity">-</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import utils from '@/services/common.js'
import Cookies from 'js-cookie'
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      imgSrc: ''
    }
  },
  created() {
    let vm = this
    let userId = vm.$store.state.user.userInfo.userId
    vm.imgSrc = utils.getImgFilePath(
      vm.item.product.productPicture + '&userId=' + userId
    )
  },
  methods: {
    addQuantity() {
      let vm = this
      vm.$store.dispatch('cart/addItemQuantity', vm.item.product.id)
    },
    reduceQuantity() {
      let vm = this
      vm.$store.dispatch('cart/reduceItemQuantity', vm.item.product.id)
    }
  }
}
</script>

<style scoped>
.main_div {
  margin-bottom: 5px;
  border-bottom: 1px dashed gray;
}
.img_div {
  height: 100px;
  width: 100px;
}
.detial_div {
  height: 100px;
  width: 600px;
}

.settlement_div {
  height: 100px;
  width: 100%;
}
.product_detial_div {
  width: 100%;
  height: 25px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
}
.price_div {
  height: 100px;
  line-height: 100px;
  width: 100%;
  font-family: 'Microsoft YaHei';
  font-size: 40px;
  float: left;
  text-align: center;
}
.quantity_div {
  line-height: 100px;
  height: 100px;
  width: 100%;
}
.quantity_number_div {
  height: 100px;
  width: 100px;
  float: left;
}
.quantity_operating_div {
  height: 100px;
  width: 100px;
  margin-left: 100px;
}
.add_div {
  height: 50px;
  width: 100%;
}
.remove_div {
  height: 50px;
  width: 100%;
}
.img_picture {
  width: 100%;
  height: 100%;
}
</style>
