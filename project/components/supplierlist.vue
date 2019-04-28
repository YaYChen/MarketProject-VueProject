<template>
  <div class="layout_center">
    <div class="button_container">
      <el-button 
        plain
        @click="addDialogVisible=true">{{ $t("button.add") }}</el-button>
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
                    class="item" 
                    effect="dark" 
                    content="删除" 
                    placement="top">
                    <i
                      class="el-icon-delete"
                      @click="deleteSupplier(item.id)"/>
                  </el-tooltip>
                </div>
                <div class="operate_item_div">
                  <el-tooltip 
                    class="item" 
                    effect="dark" 
                    content="编辑" 
                    placement="top">
                    <i
                      class="el-icon-edit"
                      @click="editSupplier(item.id)"/>
                  </el-tooltip>
                </div>
              </div>
              <div>
                <div class="detial_img_div">123</div>
              </div>
              <div>
                <div>
                  <div class="detial_info_title_div">Name:</div>
                  <div class="detial_info_div">{{ item.name }}</div>
                </div>
                <div>
                  <div class="detial_info_title_div">Brand:</div>
                  <div class="detial_info_div">{{ item.brand }}</div>
                </div>
                <div>
                  <div class="detial_info_title_div">Phone:</div>
                  <div class="detial_info_div">{{ item.tell }}</div>
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
              <el-input v-model="onEditSupplier.tell"/>
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
          @click="dialogClose">{{ $t("button.confirm") }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import utils from '@/services/common.js'

export default {
  data() {
    return {
      supplierList: [
        {
          id: 0,
          name: 'zhangsan',
          brand: 'GUCCI',
          tell: '123456789'
        },
        {
          id: 1,
          name: 'lisi',
          brand: 'CHANEL',
          tell: '987654321'
        },
        {
          id: 2,
          name: 'lisi',
          brand: 'CHANEL',
          tell: '987654321'
        },
        {
          id: 3,
          name: 'lisi',
          brand: 'CHANEL',
          tell: '987654321'
        }
      ],
      onEditSupplier: {},
      dialogVisible: false,
      dialogTitle: '添加',
      imgUploadPath: utils.imgUploadPath,
      imageUrl: ''
    }
  },
  create() {},
  methods: {
    addDialogClose() {
      let vm = this
      vm.$confirm('确认关闭？')
        .then(_ => {
          alert('HelloWorld')
          vm.dialogVisible = false
        })
        .catch(_ => {})
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
    deleteSupplier(id) {},
    editSupplier(id) {
      let vm = this
      vm.supplierList.forEach(element => {
        if (element.id === id) {
          vm.onEditSupplier = element
        }
      })
      vm.dialogVisible = true
    },
    dialogClose() {
      let vm = this
      vm.dialogVisible = false
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
  background: lightgreen;
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
