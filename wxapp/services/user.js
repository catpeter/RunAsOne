const request = require('./request.js')
const prefix =  'user'

function getUser() {
  return request.wxRequest(prefix)
}

module.exports = {
  getUser: getUser
}