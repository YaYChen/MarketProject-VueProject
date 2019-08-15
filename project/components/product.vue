<template>
  <div class="product_box">
    <div class="product_picture_box">
      <img 
        :src="updateImg(product.productPicture)"
        class="img_picture"
      >
    </div>
    <div class="product_detail_box">
      <div class="product_detail_info">
        <div class="show_detail_info_title">{{ $t('product.name') }}:</div>
        <div class="show_detail_info_value">{{ product.name }}</div>
        <div class="show_detail_info_title">{{ $t('product.category') }}:</div>
        <div class="show_detail_info_value">{{ product.category.name }}</div>
        <div class="show_detail_info_title">{{ $t('product.specification') }}:</div>
        <div class="show_detail_info_value">{{ product.specification }}</div>
      </div>
      <div class="product_detail_price">
        <div class="show_price_title">{{ $t('product.price') }}(￥)：</div>
        <div class="show_price_value_box">
          {{ product.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/services/common.js'
import Cookies from 'js-cookie'
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {}
  },
  created() {
    let vm = this
    let user = JSON.parse(Cookies.get('user') || null)
    if (user !== null) {
      vm.$store.dispatch('user/addUser', user)
    } else {
      vm.$router.push({ name: 'login' })
    }
  },
  methods: {
    updateImg: function(filename) {
      let vm = this
      let userId = vm.$store.state.user.userInfo.userId
      return utils.getImgFilePath(filename + '&userId=' + userId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product_box {
  width: 100%;
  height: 300px;
  border: 1px solid lightgray;
}

.product_picture_box {
  width: 298px;
  height: 298px;
  padding: 2px;
  float: left;
}

.product_detail_box {
  width: 700px;
  height: 298px;
  padding: 2px;
  margin-left: 299px;
}

.img_picture {
  width: 295px;
  height: 294px;
}

.query_button {
  cursor: hand;
}

.product_detail_info {
  height: 294px;
  width: 300px;
  text-align: left;
  float: left;
}

.product_detail_price {
  height: 294px;
  width: 394px;
  text-align: left;
  display: inline-block;
}

.show_detail_info_title {
  height: 40px;
  line-height: 40px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  color: gray;
}

.show_detail_info_value {
  height: 50px;
  line-height: 50px;
  font-family: 'Microsoft YaHei';
  font-size: 30px;
}

.show_price_title {
  height: 64px;
  width: 394px;
  font-family: 'Microsoft YaHei';
  font-size: 30px;
  padding: 2px;
  border-bottom: 1px dashed lightgray;
}

.show_price_value_box {
  height: 230px;
  line-height: 230px;
  width: 394px;
  font-family: 'Microsoft YaHei';
  font-size: 120px;
  color: green;
  float: left;
  text-align: center;
}

.show_price_value {
  height: auto;
  width: 334px;
  font-family: 'Microsoft YaHei';
  font-size: 120px;
  color: green;
  float: left;
  margin-top: 50px;
}

.show_price_value_symbol {
  height: auto;
  width: 60px;
  font-family: 'Microsoft YaHei';
  font-size: 30px;
  float: left;
  margin-top: 185px;
}
</style>
