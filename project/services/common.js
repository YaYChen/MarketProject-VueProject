export default {
  //dev: http://localhost:8080
  //prod:http://101.132.123.27:8080
  getImgFilePath: function(imgName) {
    return 'http://localhost:8080/show-img?fileName=' + imgName
  },
  imgUploadPath: 'http://localhost:8080/upload-img'
}
