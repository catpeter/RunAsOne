// pages/main/main.js
const app = getApp()
const enums = require('../../utils/enum.js')
const activityService = require('../../services/activity')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_index: 1,
    show_search_back: false,
    //   activity_data: data.data.activity,
    //   swiper:data.data.swiper,
    activity_data: '',
    swiper: '',
    tag_select: 0,
    open: false,

    activityList: [],
    type: enums.TYPE,
    TypecColor: ['A', 'B', 'C', 'D', 'E', 'F']
  },

  createActivity() {
    wx.navigateTo({
      url: '/pages/activity/createActivity/createActivity'
    })
  },
  getActivityDetail (e) {
    wx.navigateTo({
      url: '/pages/activity/activityDetail/activityDetail?id=' + e.currentTarget.dataset.activityId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 页面初始化函数
  initPage() {
    self = this;
    let data = { status: 0 }
    activityService.getActivities(data).then((res) => {
      self.setData({
        activityList: res
      })
    })
  },
  // 请求成功回调函数
  initPage_request_suc: function (res) {
    self.setData({
      activity_data: res.data.activity,
      swiper: res.data.swiper
    });
  },
  bindscroll: function (e) {
    if (e.detail.scrollTop > 2) {
      this.setData({
        show_search_back: true
      });
    }
  },
  reach_top: function () {
    this.setData({
      show_search_back: false
    });
  },
  open_side_list: function () {
    this.setData({
      open: !this.data.open,
      show_search_back: !this.data.show_search_back
    });
  },
  click_side_item: function (e) {
    let list_index = e.currentTarget.dataset.listIndex;
    this.setData({
      page_index: list_index,
      open: !self.data.open
    });
  },
  // 点击tag的响应函数
  click_tag: function (e) {
    self = this;
    console.log(e.currentTarget.dataset.tagIndex);
    let index = e.currentTarget.dataset.tagIndex;
    switch (index) {
      case "0":
        this.setData({
          tag_select: 0
        });
        break;
      case "1":
        this.setData({
          tag_select: 1
        });
        break;
      case "2":
        this.setData({
          tag_select: 2
        });
        break;
    }
  },
  // 点击活动进入活动详情页面
  click_activity: function (e) {
    console.log(e.currentTarget.dataset.actid);
    let actid = e.currentTarget.dataset.actid;
    let user_key = wx.getStorageSync('user_key');
    wx.navigateTo({
      url: '/pages/detail/detail?actid=' + actid,
    });
  },
  click_search: function () {
  }
})