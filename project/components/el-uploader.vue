<template>
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
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    handleAvatarSuccess(res, file) {
      alert('Upload img success!')
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('handleAvatarSuccess', file.name, this.imageUrl)
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
    }
  }
}
</script>

<style scoped>
.layout_header {
  height: auto;
  width: 100%;
}
.upload-demo {
  width: 100%;
  height: auto;
}
.upload_button {
  height: 40px;
  width: 100px;
  font-size: 12px;
  background-color: dodgerblue;
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
