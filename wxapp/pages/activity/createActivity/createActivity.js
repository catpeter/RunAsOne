// pages/activity/createActivity/index.js'
import WxValidate from '../../../assets/plugins/WxValidate'
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
    number: 0,
    bk: '',
    address: null
  },
  onLoad() {
    let that = this
    this.initValidate()
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
  typeChange(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  sliderChange(e) {
    this.setData({
      number: e.detail.value
    })
  },
  // 表单
  formSubmit(e) {
    let formData = this.checkForm(e.detail.value)
    if (formData) {
      activityService.createActivity(formData).then((res) => {
        console.log(res)
        wx.switchTab({
          url: '../../main/main',
        })
      })
    }
  },
  checkForm: function (formData) {
    formData['activityDate'] = this.data.activityDate
    formData['deadLine'] = this.data.deadLine
    formData['number'] = this.data.number
    formData['activityType'] = this.data.typeIndex
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(formData)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: error.msg,
        icon: 'none'
      })
      return
    }
    const now = moment()
    if (moment(formData.deadLine, 'YYYY-MM-DD HH:mm').diff(moment(now, 'YYYY-MM-DD HH:mm')) < 0) {
      wx.showToast({
        title: '截止时间必须大于当前时间',
        icon: 'none'
      })
      return
    }
    if (moment(formData.activityDate, 'YYYY-MM-DD HH:mm').diff(moment(formData.deadLine, 'YYYY-MM-DD HH:mm')) < 0) {
      wx.showToast({
        title: '活动时间必须大于截止时间',
        icon: 'none'
      })
      return
    }
    if (!this.data.address) {
      wx.showToast({
        title: '请选择活动地点',
        icon: 'none'
      })
      return
    }
    formData['address'] = JSON.stringify(this.data.address)
    return formData
  },
  setAddress: function() {
    let that = this
    wx.chooseLocation({
      success: function(res) {
        delete res.errMsg
        that.setData({
          address: res
        })
      },
    })
  },
  initValidate: function() {
    // 验证字段的规则
    const rules = {
      activityName: {
        required: true,
        maxlength: 20
      },
      activityDate: {
        required: true,
      },
      deadLine: {
        required: true,
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      activityName: {
        required: '请输入活动名称',
        maxlength: '活动名称不能超过20字'
      },
      activityDate: {
        required: '请输入活动时间'
      },
      deadLine: {
        required: '请输入截止时间'
      },
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  },
})