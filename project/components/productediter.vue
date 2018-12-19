<template>
  <div class="product_editer_box">
    <div class="img_upload_box">
      <label>Product Picture Upload:</label>
      <uploader-component
        id="imgUpload"
        :imageurl="product.productPicture"
        @:handleAvatarSuccess="handleAvatarSuccess"
      />
    </div>
    <div class="product_detial_box">
      <form>
        <div class="form-group">
          <label>Name:</label>
          <input
            id="input_name"
            v-model="product.name"
            type="text"
            class="form-control"
            placeholder="Enter Name"
          >
        </div>
        <div class="form-group">
          <label>Category:</label>
          <el-select
            v-model="selectValue"
            class="form_select"
            placeholder="Category select..."
            @change="selectChange"
          >
            <el-option
              v-for="item in selectCategories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="form-group">
          <label>Specification:</label>
          <input
            id="input_specification"
            v-model="product.specification"
            type="text"
            class="form-control"
            placeholder="Enter Specification"
          >
        </div>
        <div class="form-group">
          <label>PurchasePrice:</label>
          <input
            id="input_purchasePrice"
            v-model="product.purchasePrice"
            type="text"
            class="form-control"
            placeholder="Enter PurchasePrice"
          >
        </div>
        <div class="form-group">
          <label>Price:</label>
          <input
            id="input_price"
            v-model="product.price"
            type="text"
            class="form-control"
            placeholder="Enter Price"
          >
        </div>
        <button 
          type="submit" 
          class="btn btn-primary" 
          @click="submit"
        >submit</button>
        <button 
          type="button" 
          class="btn btn-primary" 
          @click="cancel"
        >cancle</button>
      </form>
    </div>
  </div>
</template>

<script>
import uploaderComponent from '@/components/el-uploader.vue'
export default {
  components: {
    'uploader-component': uploaderComponent
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    update: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      selectCategories: [],
      selectValue: '',
      imgFileName: ''
    }
  },
  created: function() {
    var vm = this
    this.$axios
      .get('/getCategories')
      .then(response => {
        vm.selectCategories = response.data
        if (
          vm.product.category.id !== '' ||
          vm.product.category.id !== undefined
        ) {
          vm.selectValue = vm.product.category.id
        }
      })
      .catch(function(error) {
        alert(error)
      })
  },
  methods: {
    submit: function() {
      try {
        var vm = this
        if (this.update == true) {
          if (vm.imgFileName === '') {
            alert('Please upload img...')
          } else {
            vm.product.productPicture = vm.imgFileName
          }
          var postData = JSON.stringify(vm.product)
          this.$axios
            .post('/update-product', postData, {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            })
            .then(response => {
              alert(response.data.message)
            })
            .catch(function(error) {
              alert(error)
            })
        } else {
          if (vm.imgFileName !== '') {
            vm.product.productPicture = vm.imgFileName
          }
          var postData = JSON.stringify(vm.product)
          this.$axios
            .post('/insert-product', postData, {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            })
            .then(response => {
              alert(response.data.message)
            })
            .catch(function(error) {
              alert(error)
            })
        }
      } catch (error) {
        alert(error.message)
      }
    },
    cancel: function() {
      this.$emit('disableEditer')
    },
    selectChange: function() {
      this.product.category.id = this.selectValue
    },
    handleAvatarSuccess: function(fileName, imgUrl) {
      this.imgFileName = fileName
      this.product.productPicture = imgUrl
    }
  }
}
</script>

<style scoped>
.product_editer_box {
  width: 100%;
  height: auto;
}
.img_upload_box {
  width: 100%;
  height: auto;
}
.product_detial_box {
  width: 100%;
  height: auto;
}
.button_box {
  width: 100%;
  height: auto;
}
.form_select {
  width: 100%;
  height: auto;
  float: left;
}
</style>
