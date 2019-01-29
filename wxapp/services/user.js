const request = require('./request.js')
const prefix =  'user'

function getUser() {
  return request.wxGet(prefix)
}

module.exports = {
  getUser: getUser
}