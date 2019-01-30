// pages/activity/activityDetail/activityDetail.js
const activityService = require('../../../services/activity')
const recordService = require('../../../services/record')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    let that = this
    activityService.getActivityById('5c495e4ee5ec4300dcd72be5').then((res) => {
      console.log(res)
      that.setData({
        activityDetail: res
      })
    })
  },
  participate() {
    console.log(12321)
    let formData = { applicant: '5c513aca20ae9104f28653e9', activity: this.data.activityDetail._id, appNum: this.data.activityDetail.appNum + 1}
    recordService.createRecord(formData).then((res) => {
      console.log(res)
    })
  },
})