const request = require('./request.js')
const prefix = 'activity'

function getActivities(data) {
  return request.wxGet(prefix, data)
}

function getActivityById(id) {
  return request.wxGet(prefix + '/' + id)
}

function upload(filePath, name, data) {
  return request.wxUploadFile(prefix, filePath, name, data)
}

function createActivity(data) {
  return request.wxPost(prefix, data)
}

function changeActivity(_id, data) {
  return request.wxPut(prefix + `/${_id}`, data)
}

module.exports = {
  createActivity: createActivity,
  changeActivity: changeActivity,
  getActivities: getActivities,
  upload: upload,
  getActivityById: getActivityById
}