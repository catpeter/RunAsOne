// pages/activity/createActivity/index.js'
const utils = require('../../../utils/util.js')
const activityService = require('../../../services/activity')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: '/assets/images/system/default.svg'
  },
  // 图片
  chooseImageTap() {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage(type) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        console.log(res)
        that.setData({
          photo: res.tempFilePaths[0]
        })
      },
    })
  },
  // 表单
  formSubmit(e) {
    console.log(e.detail.value)
    let formData = e.detail.value
    formData['sponsor'] = '5c37633820ae9104f2844935'
    activityService.changeActivity('5c3e9ba920ae9104f2846961', formData).then((res) => {
      console.log(res)
    })
  }
})