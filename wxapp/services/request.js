const config = require('../config/config.js')
function wxGet(url, data) {
  return wxRequest(url, data)
}
function wxPost(url, data) {
  return wxRequest(url, data, 'POST', 'application/x-www-form-urlencoded')

}
function wxPut(url, data) {
  return wxRequest(url, data, 'PUT')
}
function wxDelete(url, data) {
  return wxRequest(url, data, 'DELETE')
}

function wxRequest(url, data, method = 'GET', contentType = 'application/json') {
  let promise = new Promise((resolve, reject) => {
    getNetwork().then((err) => {
      //init
      let that = this,
        getData = data
      //网络请求
      wx.request({
        url: config.baseUrl + url,
        data: getData,
        method: method,
        header: {
          'content-type': contentType
        },
        success: function(res) { //服务器返回数据
          if (parseInt(res.statusCode) === 200) {
            resolve(res.data)
          } else if (parseInt(res.statusCode) === 204) {  //无返回值
            resolve(res)
          } else {          //返回错误提示信息
            reject(res.data)
          }
        },
        fail: function(e) {
          reject(e)
        }
      })
    })
  })
  return promise
}

function wxUploadFile(url, filePath, name, data) {
  let promise = new Promise((resolve, reject) => {
    if (!filePath) {
      reject('图片有误!')
    }
    getNetwork().then(() => {
      //init
      let that = this,
        formData = data
      const upload = wx.uploadFile({
        url: config.baseUrl + url,
        filePath: filePath,
        name: name,
        header: {
          'content-type': 'multipart/form-data'
        }, // 设置请求的 header
        formData: formData, // HTTP 请求中其他额外的 form data
        success: function(res) {
          if (parseInt(res.statusCode) == 200 && !res.data.result_code) {
            resolve(JSON.parse(res.data))
          } else {
            reject(res.data)
          }
        },
        fail: function(e) {
          if (e.errMsg) {
            if (e.errMsg.indexOf('timeout') != -1) {
              wx.showToast({
                title: '请求超时!',
                icon: 'none',
                duration: 2000
              })
              return
            }
          }
          reject(e)
        }
      })
    }).catch((errMsg) => {
      reject(errMsg)
    })
  })
  return promise
}

function getNetwork() {
  let promise = new Promise((resolve, reject) => {
    wx.getNetworkType({
      success(res) {
        if (res.networkType === 'none') {
          wx.showToast({
            title: '当前无网络!',
            icon: 'none',
            duration: 2000
          })
          reject('当前无网络!')
        } else {
          resolve(res)
        }
      },
      fail(err) {
        reject(e)
      }
    })
  })
  return promise
}

function handleError(e) {
  let showErr = null
  if (e.status) {
    if (e.status === 500) {
      // if (e.message) {
      //   showErr = e.message  
      // } else {
      showErr = '服务器出现错误，请稍后再试！'
      // }
    } else if (e.status === 406) {
      // 临时
      if (e.message) {
        let p = /[a-z]/i
        let b = p.test(e.message)
        if (b) {
          showErr = '服务器出现错误，请稍后再试！'
        } else {
          showErr = e.message
        }
      }
    } else if (e.status === 504) {
      showErr = '服务器正忙，请稍后再试！'
    } else if (e.status === 401) {
      if (e.message) {
        if (e.message === '请登录') {
          wx.showToast({
            title: '请重新登录',
            icon: 'none',
            duration: 2500
          })
          wx.redirectTo({
            url: '../userInfo/login/login'
          })
          return e.message
        }
      } else {
        showErr = '服务器正忙，请稍后再试！'
      }
    }
  }
  if (e.errMsg) {
    if (e.errMsg.indexOf('timeout') != -1) {
      showErr = '请求超时！'
    } else if (e.errMsg.indexOf('fail') != -1) {
      showErr = '无法连接服务器！'
    }
  }
  if (typeof(e) == 'string') {
    if (utils.isJsonString(e)) {
      if (JSON.parse(e).message) {
        showErr = JSON.parse(e).message
      }
    } else {
      showErr = e
    }
  }
  if (showErr) {
    wx.showToast({
      title: showErr,
      icon: 'none',
      duration: 2500
    })
  }
  return showErr
}

module.exports = {
  wxGet: wxGet,
  wxPost: wxPost,
  wxPut: wxPut,
  wxUploadFile: wxUploadFile,
  wxDelete: wxDelete,
}