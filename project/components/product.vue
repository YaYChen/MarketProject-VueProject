<template>
  <div class="product_box">
    <div class="product_picture_box">
      <img 
        :src="imgSrc"
        class="img_picture"
      >
    </div>
    <div class="product_detail_box">
      <div class="product_detail_info">
        <div class="show_detail_info_title">品名:</div>
        <div class="show_detail_info_value">{{ product.name }}</div>
        <div class="show_detail_info_title">类别:</div>
        <div class="show_detail_info_value">{{ product.category.name }}</div>
        <div class="show_detail_info_title">规格:</div>
        <div class="show_detail_info_value">{{ product.specification }}</div>
      </div>
      <div class="product_detail_price">
        <div class="show_price_title">价格：</div>
        <div class="show_price_value_box">
          <div class="show_price_value_symbol">￥</div>
          <div class="show_price_value">{{ product.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      imgSrc: ''
    }
  },
  created() {
    let vm = this
    vm.imgSrc =
      'http://localhost:8080/show-img?fileName=' + vm.product.productPicture
  },
  methods: {}
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
  border-right: 1px solid lightgray;
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
}

.show_price_value_box {
  height: 230px;
  width: 394px;
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
