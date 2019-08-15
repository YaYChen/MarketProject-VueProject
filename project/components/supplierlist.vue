<template>
  <div class="layout_center">
    <div class="button_container">
      <el-button 
        plain
        @click="addNewSupplier">{{ $t("button.add") }}</el-button>
    </div>
    <div class="card_container">
      <el-row :gutter="10">
        <el-col 
          v-for="item in supplierList" 
          :key="item.id" 
          :span="8">
          <div class="card_div">
            <div class="card_content_div">
              <div class="card_operate_div">
                <div class="operate_item_div right_item">
                  <el-tooltip 
                    :content="$t('operate.delete')"
                    class="item"
                    effect="dark"
                    placement="top">
                    <i
                      class="el-icon-delete"
                      @click="deleteSupplier(item.id)"/>
                  </el-tooltip>
                </div>
                <div class="operate_item_div">
                  <el-tooltip 
                    :content="$t('operate.edit')"
                    class="item"
                    effect="dark"
                    placement="top">
                    <i
                      class="el-icon-edit"
                      @click="editSupplier(item.id)"/>
                  </el-tooltip>
                </div>
              </div>
              <div>
                <div class="detial_img_div">
                  <img
                    :src="item.picture"
                    class="img_picture">
                </div>
              </div>
              <div>
                <div>
                  <div class="detial_info_title_div">{{ $t("supplier.name") }}: </div>
                  <div class="detial_info_div">{{ item.name }}</div>
                </div>
                <div>
                  <div class="detial_info_title_div">{{ $t("supplier.brand") }}: </div>
                  <div class="detial_info_div">{{ item.brand }}</div>
                </div>
                <div>
                  <div class="detial_info_title_div">{{ $t("supplier.phone") }}: </div>
                  <div class="detial_info_div">{{ item.phone }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="30%">
      <div>
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
              class="avatar upload_img"
            >
            <i 
              v-else 
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </div>
        <div>
          <el-form
            :model="onEditSupplier"
            label-position="right" 
            label-width="80px">
            <el-form-item label="Name:">
              <el-input v-model="onEditSupplier.name"/>
            </el-form-item>
            <el-form-item label="Brand:">
              <el-input v-model="onEditSupplier.brand"/>
            </el-form-item>
            <el-form-item label="Phone:">
              <el-input v-model="onEditSupplier.phone"/>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button 
          @click="dialogVisible = false">{{ $t("button.cancel") }}</el-button>
        <el-button 
          type="primary" 
          @click="dialogCommit">{{ $t("button.confirm") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import utils from '@/services/common.js'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      supplierList: [],
      onEditSupplier: {},
      dialogVisible: false,
      dialogTitle: '添加',
      imgUploadPath: utils.imgUploadPath,
      imageUrl: '',
      rules: {
        name: [
          {
            required: true,
            message: this.$t('supplierRule.nameRule'),
            trigger: 'blur'
          }
        ],
        brand: [
          {
            required: true,
            message: this.$t('supplierRule.brandRule'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('supplierRule.phoneRule'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    let vm = this
    let user = JSON.parse(Cookies.get('user') || null)
    if (user !== null) {
      vm.$store.dispatch('user/addUser', user)
      vm.loadSuppliers()
    } else {
      vm.$router.push({ name: 'login' })
    }
  },
  methods: {
    loadSuppliers() {
      let vm = this
      vm.supplierList = []
      vm.$axios
        .get('/getAllSupplier')
        .then(function(response) {
          let list = response.data
          list.forEach(element => {
            let supplier = {
              id: element.id,
              name: element.name,
              brand: element.brand,
              phone: element.phone,
              picture: utils.getImgFilePath(element.picture)
            }
            vm.supplierList.push(supplier)
          })
        })
        .catch(function(error) {
          console.log(error)
        })
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
      vm.onEditSupplier.picture = fileName
      alert('Upload img success!')
    },
    handleAvatarFaile: function(err, file, fileList) {
      console.log('err: ' + err)
    },
    deleteSupplier(id) {
      let vm = this
      vm.$axios
        .delete('/deleteSupplier', {
          params: {
            id: id
          }
        })
        .then(function(response) {
          if (response.data.message === 'Success!') {
            vm.loadSuppliers()
            alert(response.data.message)
          } else {
            alert(response.data.message)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    editSupplier(id) {
      let vm = this
      vm.dialogTitle = vm.$t('dialog.titleEdit')
      vm.supplierList.forEach(element => {
        if (element.id === id) {
          vm.onEditSupplier = {
            id: element.id,
            name: element.name,
            brand: element.brand,
            phone: element.phone,
            picture: element.picture
          }
        }
      })
      vm.imageUrl = vm.onEditSupplier.picture
      vm.dialogVisible = true
    },
    dialogCommit() {
      let vm = this
      if (vm.onEditSupplier.id != null && vm.onEditSupplier.id != '') {
        var postData = JSON.stringify(vm.onEditSupplier)
        vm.$axios
          .post('/updateSupplier', postData, {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          .then(response => {
            if (response.data.message === 'Success!') {
              vm.loadSuppliers()
              alert(response.data.message)
            } else {
              alert(response.data.message)
            }
          })
          .catch(function(error) {
            alert(error)
          })
      } else {
        var postData = JSON.stringify(vm.onEditSupplier)
        vm.$axios
          .post('/insertSupplier', postData, {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          .then(response => {
            if (response.data.message === 'Success!') {
              vm.loadSuppliers()
              alert(response.data.message)
            } else {
              alert(response.data.message)
            }
          })
          .catch(function(error) {
            alert(error)
          })
      }
      vm.dialogVisible = false
    },
    addNewSupplier() {
      let vm = this
      vm.dialogTitle = vm.$t('dialog.titleAdd')
      vm.onEditSupplier = {}
      vm.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.layout_center {
  width: 100%;
  min-height: 800px;
  margin: 10px auto;
}
.button_container {
  margin: 10px auto;
  width: 1000px;
  padding: 10px;
  border-bottom: 5px solid black;
}
.card_container {
  margin: 10px auto;
  width: 1000px;
}
.card_div {
  margin: 5px;
  padding: 5px;
}
.card_content_div {
  width: 300px;
  height: auto;
  margin: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
}
.card_content_div:hover {
  box-shadow: 2px 2px 10px grey;
}
.detial_info_title_div {
  width: 130px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-family: 'Microsoft YaHei';
  text-align: right;
  float: left;
}
.detial_info_div {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-family: 'Microsoft YaHei';
  text-align: left;
}
.detial_img_div {
  margin: 10px auto;
  height: 200px;
  width: 180px;
}
.img_picture {
  width: 100%;
  height: 100%;
}
.card_operate_div {
  text-align: right;
  padding: 5px;
}
.operate_item_div {
  margin-left: 10px;
  padding-left: 10px;
  cursor: pointer;
}
.right_item {
  float: right;
  border-left: 1px solid gray;
}
.img_upload_box {
  width: 100%;
  height: auto;
}
.upload_img {
  width: 180px;
  height: 200px;
}
</style>
