<template>
  <div class="product_editer_box">
    <div class="img_upload_box">
      <label>Product Picture Upload:</label>
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        class="avatar-uploader"
        action="http://localhost:8080/upload-img"
      >
        <img 
          v-if="imageUrl" 
          :src="imageUrl" 
          class="avatar"
        >
        <i 
          v-else 
          class="el-icon-plus avatar-uploader-icon"
        />
      </el-upload>
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
          v-model="selectValue"
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
export default {
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
      imageUrl: '',
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
      })
      .catch(function(error) {
        alert(error)
      })
    vm.orginalProduct = vm.product
    vm.selectValue = vm.product.category.id
    vm.imageUrl = vm.productPicture
  },
  methods: {
    submit: function() {
      try {
        var vm = this
        if (this.update == true) {
          if (vm.product.productPicture === '') {
            alert('Please upload img...')
          } else {
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
          }
        } else {
          if (vm.product.productPicture === '') {
            alert('Please upload img...')
          } else {
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
    handleAvatarSuccess: function(response, file) {
      let vm = this
      vm.imageUrl = URL.createObjectURL(file.raw)
      vm.saveImgFile(response.message)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    saveImgFile: function(fileName) {
      let vm = this
      vm.product.productPicture = fileName
      alert('Upload img success!')
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
