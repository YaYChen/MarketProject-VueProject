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
    <el-form
      :model="product" 
      label-position="top" 
      label-width="80px" 
    >
      <el-form-item label="名称：">
        <el-input v-model="product.name"/>
      </el-form-item>
      <el-form-item label="类别：">
        <el-select
          v-model="product.category"
          placeholder="Category select..."
        >
          <el-option
            v-for="item in selectCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格：">
        <el-input v-model="product.specification"/>
      </el-form-item>
      <el-form-item label="进价：">
        <el-input v-model="product.purchasePrice"/>
      </el-form-item>
      <el-form-item label="售价：">
        <el-input v-model="product.price"/>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="submit"
        >立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
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
      orginalProduct: '',
      selectCategories: [],
      selectValue: '',
      imgFileName: '',
      rules: {
        name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            message: '请输入商品类别',
            trigger: 'blur'
          }
        ],
        specification: [
          {
            required: true,
            message: '请输入商品规格',
            trigger: 'blur'
          }
        ],
        purchasePrice: [
          {
            required: true,
            message: '请输入商品进价',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入商品售价',
            trigger: 'blur'
          }
        ]
      }
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
    vm.orginalProduct = vm.product
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
    resetForm: function() {
      this.product = this.orginalProduct
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
