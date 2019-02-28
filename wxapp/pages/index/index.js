 //index.js
const userService = require('../../services/user')
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
      that.setData({
        height: rect.height,
        top: rect.height * 0.45,
        left: rect.width * 0.33,
      })
    }).exec()
    wx.checkSession({
      success(res) {
        // session_key 未过期，并且在本生命周期一直有效
        console.log(res)
        app.globalData.personId = '5c774796dac5441fe437c6fc'
        wx.switchTab({
          url: '../main/main',
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              userService.wxlogin(res.code).then((res) => {
                console.log(res)
                // that.setData({
                //   activityDetail: res
                // })
              })
              // 获取openId并缓存
              // wx.setStorageSync(key, data)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
              wx.showToast({
                title: '获取用户登录态失败,请稍后再试!',
                icon: 'none'
              })
              // wx.redirectTo({
              //   url: '../userInfo/login/login'
              // })
            }
          },
          fail: err => {
            wx.showToast({
              title: '获取用户登录态失败,请稍后再试!',
              icon: 'none'
            })
            wx.redirectTo({
              url: '../userInfo/login/login'
            })
          }
        })   
      }
    })
 
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      let formData = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }
      wx.login({
        success(res) {
          console.log(res)
          if (res.code) {
            // 发起网络请求
            formData['code'] = res.code
            userService.createUser(formData).then((res) => {
              console.log(res)
              if (res._id) {
                wx.switchTab({
                  url: '../main/main',
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
})