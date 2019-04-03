// pages/main/main.js
const app = getApp()
const enums = require('../../utils/enum.js')
const activityService = require('../../services/activity')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    swiper: [{ url: '/assets/images/main/0.jpg', actid: '0' }, { url: '/assets/images/main/1.jpg', actid: '1' }, { url: '/assets/images/main/2.jpg', actid: '2' }, { url: '/assets/images/main/3.jpg', actid: '3' }, { url: '/assets/images/main/4.jpg', actid: '4' }, { url: '/assets/images/main/5.jpg', actid: '5' }],
    page_index: 1,
    show_search_back: false,
    activity_data: '',
    tag_select: 0,
    open: false,
    statusOptions: enums.STATUS,
    statusColor: enums.STATUSCOLOR,
    activityList: [],
    typeOptions: enums.TYPE,
    tabOptions: ['所有活动', '跑步活动', '娱乐']
  },
  onLoad: function (options) {
    this.initPage()
  },
  // 页面初始化函数
  initPage(query = {}) {
    const that = this
    activityService.getActivities(query).then((res) => {
      that.setData({
        activityList: res
      })
    })
  },
  bindchange(e) {
    let query = {}
    if (parseInt(e.detail.current) > 0) {
      query['activityType'] = parseInt(e.detail.current) - 1
    }
    this.initPage(query)
  },
  // 选项卡切换
  checkCurrent(e) {
    const that = this
    if (that.data.currentData === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 进入详情页
  getActivityDetail(e) {
    wx.navigateTo({
      url: '/pages/activity/activityDetail/activityDetail?id=' + e.currentTarget.dataset.activityId
    })
  },
  createActivity() {
    wx.navigateTo({
      url: '/pages/activity/createActivity/createActivity'
    })
  },
  // 点击活动进入活动详情页面
  click_activity: function (e) {
    console.log(e.currentTarget.dataset.actid)
    // let actid = e.currentTarget.dataset.actid
    // let user_key = wx.getStorageSync('user_key')
    // wx.navigateTo({
    //   url: '/pages/detail/detail?actid=' + actid,
    // })
  }
})