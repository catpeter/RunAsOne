// pages/location/location/location.js

Page({
  data: {
    address: null,
    detail: null
  },
  navigateToSearch: function() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        delete res.errMsg
        that.setData({
          address: res
        })
      },
    })
    // wx.navigateTo({
    //   url: '../search/search'
    // });
  },
  getAddress: function(address) {
    that.setData({
      address: address
    });
  },
  setAddress: function() {
    if (!this.data.address) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
      return
    }
    let addressList = []
    if (wx.getStorageSync('addressList')) {
      addressList = wx.getStorageSync('addressList')
      wx.removeStorageSync('addressList')
    }
    let address = this.data.address
    if (this.data.detail) {
      address.value += this.data.detail
    }
    addressList.push(address)
    wx.setStorageSync('addressList', addressList)
    wx.navigateBack({
      delta: 1
    })
  },
  setDetail: function(e) {
    this.setData({
      detail: e.detail.value
    })
  }
})