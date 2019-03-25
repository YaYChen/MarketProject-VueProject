<template>
  <div>
    <div class="div_up">
      <div class="div_up_div text_content">Market</div>
    </div>
    <div class="div_down">
      <div class="div_down_div text_content">Market</div>
    </div>
    <div class="layout_foot">©2019 YaYChen</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout_foot {
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  font-family: 'Microsoft YaHei';
  color: white;
  background-color: black;
  text-align: center;
}
.div_up,
.div_down {
  position: relative;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  background: white;
}
.text_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  font-family: 'Microsoft YaHei';
}
.div_down {
  background: black;
}
.div_up_div {
  color: black;
}
.div_down_div {
  top: -50%;
  color: white;
}
</style>
