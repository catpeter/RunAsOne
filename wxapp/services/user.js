const request = require('./request.js')
const prefix =  'user'

function getUser() {
  request.wxRequest(prefix)
}

module.exports = {
  getUser: getUser
}