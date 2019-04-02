// pages/activity/activityDetail/activityDetail.js
const activityService = require('../../../services/activity')
const recordService = require('../../../services/record')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityDetail: {},
    signedUp: false,
    recordId: null,
    showSign: false,
    key: 'B2ZBZ-2BKWJ-USMFU-FRYMM-Y7IRF-ABBPQ',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    activityService.getActivityById(options.id).then((res) => {
      that.setData({
        activityDetail: res,
        showSign: res.appNum < res.number ? true : false
      })
      this.setData({
        markers: [{
          id: 1,
          latitude: res.address.latitude,
          longitude: res.address.longitude,
          // iconPath: '/assets/images/record/location.png',
          callout: { //    气泡
            content: res.address.name, //    标题
            color: '#FFFFFF', //    字体颜色
            fontSize: '14', //    字体大小
            bgColor: "#E8A823", //    背景颜色
            borderRadius: '5', //    边框圆角
            padding: '6', //    内边距
            display: 'ALWAYS' //    气泡显示方式 'BYCLICK':点击显示; 'ALWAYS':常显
          }
        }]
      })
    })
    let data = {
      applicant: app.globalData.personId,
      activity: options.id,
      deleted: false
    }
    recordService.getRecords(data).then((res) => {
      console.log(res)
      that.setData({
        signedUp: res && res.length && res.length > 0,
        recordId: res && res.length && res.length > 0 ? res[0]._id : null
      })
    })
  },
  participate() {
    let that = this
    if (this.data.signedUp) {
      // let formData = {
      //   activity: this.data.activityDetail._id,
      //   appNum: this.data.activityDetail.appNum - 1
      // }
      // recordService.destoryedRecord(this.data.recordId, formData).then((res) => {
      //   console.log(res)
      //   let activityDetail = that.data.activityDetail
      //   activityDetail.appNum = formData.appNum
      //   console.log(activityDetail)
      //   if(res.ok) {
      //     that.setData({
      //       signedUp: false,
      //       activityDetail: activityDetail
      //     })
      //   }
      // })
    } else {
      let formData = {
        applicant: app.globalData.personId,
        activity: this.data.activityDetail._id,
        appNum: this.data.activityDetail.appNum + 1
      }
      recordService.createRecord(formData).then((res) => {
        console.log(res)
        let activityDetail = that.data.activityDetail
        activityDetail.appNum = formData.appNum
        if (res._id) {
          that.setData({
            signedUp: true,
            activityDetail: activityDetail
          })
          wx.showToast({
            title: '报名成功！',
          })
        }
      })
    }
  },
  checkMap: function(e) {
    let that = this
    wx.openLocation({
      latitude: that.data.activityDetail.address.latitude,
      longitude: that.data.activityDetail.address.longitude,
      scale: 28,
      name: that.data.activityDetail.address.name,
      address: that.data.activityDetail.address.value,
      // success: res => {
      //   console.log(res)
      // }
    })
  }
})