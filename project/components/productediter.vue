<template>
  <div class="product_editer_box">
    <div class="img_upload_box">
      <label>{{ $t('uploadImg') }}:</label>
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarFaile"
        :before-upload="beforeAvatarUpload"
        :action="common.imgUploadPath"
        class="avatar-uploader"
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
      <el-form-item :label="$t('product.name')">
        <el-input v-model="product.name"/>
      </el-form-item>
      <el-form-item :label="$t('product.category')">
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
      <el-form-item :label="$t('product.specification')">
        <el-input v-model="product.specification"/>
      </el-form-item>
      <el-form-item :label="$t('product.purchasePrice')">
        <el-input v-model="product.purchasePrice"/>
      </el-form-item>
      <el-form-item :label="$t('product.price')">
        <el-input v-model="product.price"/>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="submit"
        >{{ $t('button.save') }}</el-button>
        <el-button @click="hiddenForm">{{ $t('button.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import common from '@/services/common.js'

export default {
  props: {
    product: {
      type: Object,
      default: null
    },
    update: {
      type: Boolean,
      default: false
    },
    onCancel: {
      type: Function,
      default: null
    }
  },
  data: function() {
    return {
      orginalProduct: '',
      selectCategories: [],
      selectValue: '',
      imageUrl: '',
      common: common,
      rules: {
        name: [
          {
            required: true,
            message: $t('productRule.nameRule'),
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            message: $t('productRule.categoryRule'),
            trigger: 'blur'
          }
        ],
        specification: [
          {
            required: true,
            message: $t('productRule.specificationRule'),
            trigger: 'blur'
          }
        ],
        purchasePrice: [
          {
            required: true,
            message: $t('productRule.purchasePriceRule'),
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: $t('productRule.priceRule'),
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
        if (vm.update == true) {
          if (vm.product.productPicture === '') {
            alert('Please upload img...')
          } else {
            var postData = JSON.stringify(vm.product)
            vm.$axios
              .post('/update-product', postData, {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              })
              .then(response => {
                alert(response.data.message)
                vm.product = ''
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
            vm.$axios
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
    hiddenForm: function() {
      let vm = this
      vm.product = ''
      vm.onCancel()
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
    },
    handleAvatarFaile: function(err, file, fileList) {
      console.log('err: ' + err)
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
