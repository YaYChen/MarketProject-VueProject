<template>
  <div class="product_editer_box">
    <div class="img_upload_box">
      <label>{{ $t('uploadImg') }}:</label>
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarFaile"
        :before-upload="beforeAvatarUpload"
        :action="imgUploadPath"
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
      :rule="rules"
      label-position="top" 
      label-width="80px" 
    >
      <el-form-item :label="$t('product.name')">
        <el-input v-model="product.name"/>
      </el-form-item>
      <el-form-item :label="$t('product.category')">
        <div>
          <el-row>
            <el-col :span="6">
              <div>
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
              </div>
            </el-col>
            <el-col :span="18">
              <div
                class="add_category_div"
                @click="showManageCategoryDialog">Manager Category</div>
            </el-col>
          </el-row>         
        </div>
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
    <!-- Manage Category Dialog-->
    <el-dialog
      :visible.sync="manageDialogVisible"
      title="Manage Category"
      width="50%">
      <el-button 
        type="primary"
        @click="showAddCategoryDialog">Add</el-button>
      <el-table
        :data="selectCategories"
        style="width: 100%"
        max-height="250">
        <el-table-column
          type="index"
          width="50"/>
        <el-table-column
          prop="name"
          label="名称"
          width="120"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteCategory(scope.$index)">
              移除
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="editCategory(scope.$index)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--Add Category Dialog -->
      <el-dialog
        :visible.sync="addDialogVisible"
        title="Add Category"
        width="30%"
        append-to-body>
        <el-form 
          :model="newCategory" 
          :rules="rules_category" >
          <el-form-item 
            label="Category Name" 
            prop="categoryName">
            <el-input v-model="newCategory.name"/>
          </el-form-item>           
        </el-form>
        <span 
          slot="footer" 
          class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button 
            type="primary" 
            @click="addNewCategory">确 定</el-button>
        </span>
      </el-dialog>
      <span 
        slot="footer" 
        lass="dialog-footer">
        <el-button @click="manageDialogVisible = false">取 消</el-button>
        <el-button 
          type="primary" 
          @click="manageDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      imgUploadPath: '',
      rules: {
        name: [
          {
            required: true,
            message: this.$t('productRule.nameRule'),
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            message: this.$t('productRule.categoryRule'),
            trigger: 'blur'
          }
        ],
        specification: [
          {
            required: true,
            message: this.$t('productRule.specificationRule'),
            trigger: 'blur'
          }
        ],
        purchasePrice: [
          {
            required: true,
            message: this.$t('productRule.purchasePriceRule'),
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: this.$t('productRule.priceRule'),
            trigger: 'blur'
          }
        ]
      },
      addDialogVisible: false,
      newCategory: {
        name: ''
      },
      rules_category: {
        name: [
          {
            required: true,
            message: 'Name is required!',
            trigger: 'blur'
          }
        ]
      },
      manageDialogVisible: false
    }
  },
  created() {
    let vm = this
    vm.getAllCategories()
    vm.orginalProduct = vm.product
    vm.selectValue = vm.product.category.id
    vm.imageUrl =
      utils.getImgFilePath(vm.product.productPicture) +
      '&userId=' +
      vm.$store.state.user.userInfo.userId
    vm.imgUploadPath =
      utils.imgUploadPath + '?userId=' + vm.$store.state.user.userInfo.userId
  },
  methods: {
    getAllCategories() {
      let vm = this
      vm.selectCategories = []
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .get('/p/getCategories', {
            headers: {
              Authorization: token
            }
          })
          .then(response => {
            vm.selectCategories = response.data
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
    submit() {
      try {
        var vm = this
        if (vm.update == true) {
          if (vm.product.productPicture === '') {
            alert('Please upload img...')
          } else {
            var postData = JSON.stringify(vm.product)
            let token = vm.$store.state.user.userInfo.token.token
            if (token === undefined || token === '') {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$axios
                .post('/p/update-product', postData, {
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: token
                  }
                })
                .then(response => {
                  alert(response.data.message)
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
          }
        } else {
          if (vm.product.productPicture === '') {
            alert('Please upload img...')
          } else {
            vm.product.category.id = vm.selectValue
            var postData = JSON.stringify(vm.product)
            let token = vm.$store.state.user.userInfo.token.token
            if (token === undefined || token === '') {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$axios
                .post('/p/insert-product', postData, {
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: token
                  }
                })
                .then(response => {
                  alert(response.data.message)
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
          }
        }
      } catch (error) {
        vm.$message({
          message: error.message,
          type: 'warning'
        })
      }
    },
    hiddenForm: function() {
      this.$emit('disableEditer')
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
    },
    showManageCategoryDialog() {
      let vm = this
      vm.manageDialogVisible = true
    },
    showAddCategoryDialog() {
      let vm = this
      vm.addDialogVisible = true
    },
    addNewCategory() {
      let vm = this
      let postData = JSON.stringify(vm.newCategory)
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .post('/p/insert-category', postData, {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: token
            }
          })
          .then(response => {
            alert(response.data.message)
            vm.getAllCategories()
            vm.addDialogVisible = false
          })
          .catch(function(error) {
            if (error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$message({
                message: error,
                type: 'warning'
              })
            }
            vm.addDialogVisible = false
          })
      }
    },
    deleteCategory(index) {
      let vm = this
      let token = vm.$store.state.user.userInfo.token.token
      if (token === undefined || token === '') {
        vm.$message({
          message: 'No auth',
          type: 'warning'
        })
        vm.$router.push({ name: 'login' })
      } else {
        vm.$axios
          .get('/p/delete-category?id=' + vm.selectCategories[index].id, {
            headers: {
              Authorization: token
            }
          })
          .then(response => {
            vm.selectCategories.splice(index, 1)
            vm.$message({
              message: response.data.message,
              type: 'success'
            })
          })
          .catch(function(error) {
            if (error.request.status === 401) {
              vm.$message({
                message: 'No auth',
                type: 'warning'
              })
              vm.$router.push({ name: 'login' })
            } else {
              vm.$message({
                message: error,
                type: 'warning'
              })
            }
          })
      }
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
.add_category_div {
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  text-decoration: underline;
  color: lightgrey;
  cursor: pointer;
}
.add_category_div:hover {
  color: black;
}
</style>
