// pages/activity/createActivity/index.js'
const enums = require('../../../utils/enum.js')
const utils = require('../../../utils/util.js')
const activityService = require('../../../services/activity')
const moment = require('../../../assets/plugins/moment.min.js')
const pickerFile = require('../../../component/picker_datetime/picker_datetime.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: '/assets/images/system/default.svg',
    type: enums.TYPE,
    typeIndex: 0,
    pickerPreFlag: true,
    activityDate: '',
    deadLine: '',
    bk: ''
  },
  onLoad() {
    let that = this
    // WxNotificationCenter.addNotification("inviteAddress", that.getAddress, that)
    // this.initValidate()
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 300
    })
  },
  showDeadLine() {
    this.setData({
      bk: this.data.deadLine
    })
    this.datetimePicker.setPicker('deadLine')
  },
  showActivityDate() {
    this.setData({
      bk: this.data.activityDate
    })
    this.datetimePicker.setPicker('activityDate')
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
  typeChange(e) {
    this.setData({
      typeIndex: e.detail.value
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
    //     activityService.upload(this.data.photo, 'photo',formData).then((res) => {
    //   console.log(res)
    // })
  },
  setAddress: function () {
    let address = JSON.stringify(this.data.address)
    wx.navigateTo({
      url: '/pages/location/location'
    })
  },
})