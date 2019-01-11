const request = require('./request.js')
const prefix = 'activity'

// function getActivities() {
//   request.wxUploadFile(prefix + '/pic')
// }

function createActivity(filePath, name, data) {
  return request.wxUploadFile(prefix, filePath, name, data)
}

module.exports = {
  createActivity: createActivity
}