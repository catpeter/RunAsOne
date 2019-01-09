// pages/activity/createActivity/index.js
import regeneratorRuntime from '../../../assets/plugins/regenerator-runtime/runtime-module.js'
const utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: '/assets/images/system/default.svg'
  },
  async chooseImageTap() {
    let result = await utils.chooseImageTap()
    console.log(result)
  },
})