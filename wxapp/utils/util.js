const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function chooseImageTap() {
  let promise = new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            resolve(chooseWxImage('album'))
          } else if (res.tapIndex == 1) {
            resolve(chooseWxImage('camera'))
          }
        }
      },
      fail(err) {
        reject(e)
      }
    })
  })
  return promise
}

function chooseWxImage(type) {
  let promise = new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        resolve(res)
      },
      fail(err) {
        reject(e)
      }
    })
  })
  return promise
}

module.exports = {
  formatTime: formatTime,
  chooseImageTap: chooseImageTap
}