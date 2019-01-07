const request = require('./request.js')
const prefix =  'user'

const getUser = request.wxRequest(prefix, 'GET')

module.exports = {
  getUser: getUser
}