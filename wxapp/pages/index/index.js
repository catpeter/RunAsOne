//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    top: 0,
    left: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.createSelectorQuery().select('#index').boundingClientRect(function (rect) {
      console.log(rect)
      // 使页面滚动到底部
      that.setData({
        height: rect.height,
        top: rect.height * 0.45,
        left: rect.width * 0.33,
      })
    }).exec()
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})