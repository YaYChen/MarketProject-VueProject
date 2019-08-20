const utils = {
  //dev: http://localhost:8080
  //prod:http://101.132.123.27:8080
  getImgFilePath: function(imgName) {
    return 'http://localhost:8080/show-img?fileName=' + imgName
  },
  imgUploadPath: 'http://localhost:8080/upload-img',
  changeDateFormat(val) {
    if (val != null) {
      var date = new Date(
        parseInt(val.replace('/Date(', '').replace(')/', ''), 10)
      )
      //月份为0-11，所以+1，月份小于10时补个0
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var currentDate =
        date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return date.getFullYear() + '-' + month + '-' + currentDate
    }
    return ''
  },
  getDateString(date) {
    let dateString = ''
    dateString = dateString + date.getFullYear()
    dateString = dateString + (date.getMonth() + 1)
    dateString = dateString + date.getDate()
    dateString = dateString + date.getHours()
    dateString = dateString + date.getMinutes()
    dateString = dateString + date.getSeconds()
    let strlength = dateString.length
    for (let i = strlength; i < 13; i++) {
      dateString += '0'
    }
    return dateString
  },
  getDateStringForShow(date) {
    let dateString = ''
    dateString = dateString + date.getFullYear() + '-'
    dateString = dateString + (date.getMonth() + 1) + '-'
    dateString = dateString + date.getDate() + ' '
    dateString = dateString + date.getHours() + ':'
    dateString = dateString + date.getMinutes() + ':'
    dateString = dateString + date.getSeconds()
    return dateString
  },
  getDateTimeString(date) {
    let dateString = ''
    dateString = dateString + date.getFullYear() + '-'
    dateString = dateString + (date.getMonth() + 1) + '-'
    dateString = dateString + date.getDate()
    return dateString
  },
  isEmpty(value) {
    if (
      value == null ||
      value == '' ||
      value == 'undefined' ||
      value == undefined ||
      value == 'null'
    ) {
      return true
    } else {
      return false
    }
  }
}

export default utils
