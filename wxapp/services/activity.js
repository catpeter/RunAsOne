const request = require('./request.js')
const prefix = 'activity'

function getActivities() {
  request.wxUploadFile(prefix + '/pic')
}

module.exports = {
  getActivities: getActivities
}