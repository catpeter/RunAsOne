const request = require('./request.js')
const prefix = 'record'

function getRecord(data) {
  return request.wxGet(prefix, data)
}

function getRecordById(id) {
  return request.wxGet(prefix + '/' + id)
}

function upload(filePath, name, data) {
  return request.wxUploadFile(prefix, filePath, name, data)
}

function createRecord(data) {
  return request.wxPost(prefix, data)
}

function changeRecord(_id, data) {
  return request.wxPut(prefix + `/${_id}`, data)
}

module.exports = {
  createRecord: createRecord,
  changeRecord: changeRecord,
  getRecord: getRecord,
  upload: upload,
  getRecordById: getRecordById
}