<template>
  <div class="main_div">
    <div class="img_div">
      <img>
    </div>
    <div class="detial_div">
      <div class="product_detial_div">Name: {{ product.name }}</div>
      <div class="product_detial_div">Category: {{ product.category }}</div>
      <div class="product_detial_div">Specification: {{ product.specification }}</div>
      <div class="product_detial_div"/>
    </div>
    <div class="settlement_div">
      <div class="price_div">
        <p>￥</p>
        {{ product.totalPrice }}
      </div>
      <div class="quantity_div">
        <div class="quantity_number_div">{{ product.quantity }}</div>
        <div class="quantity_operating_div">
          <div class="add_div">
            <el-button @click="addQuantity">+</el-button>
          </div>
          <div class="remove_div">
            <el-button @click="removeQuantity">-</el-button>
          </div>
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
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      quantity: 1,
      totalPrice: 0
    }
  },
  created() {
    this.totalPrice = this.quantity * this.product.price
  },
  methods: {
    addQuantity: function() {
      this.$emit('addQuantity', this.index)
    },
    removeQuantity: function() {
      this.$emit('removeQuantity', this.index)
    }
  }
}
</script>

<style scoped>
.main-div {
  width: 1000px;
  height: 100px;
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
  width: 300px;
}
.product_detial_div {
  width: 100%;
  height: 25px;
  font-family: 'Microsoft YaHei';
  font-size: 20px;
}
.price_div {
  height: 100px;
  width: 100px;
  font-family: 'Microsoft YaHei';
  font-size: 40px;
  float: left;
}
.quantity_div {
  height: 100px;
  width: 200px;
  margin-left: 100px;
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
</style>
