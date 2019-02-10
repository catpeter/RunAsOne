const request = require('./request.js')
const prefix = 'user'

function getUsers(data) {
  return request.wxGet(prefix, data)
}

function getUserById(id) {
  return request.wxGet(prefix + '/' + id)
}

function createUser(data) {
  return request.wxPost(prefix, data)
}

function changeUser(_id, data) {
  return request.wxPut(prefix + `/${_id}`, data)
}

function wxlogin(jscode) {
  return request.wxGet(`${jscode}`)
}

module.exports = {
  wxlogin: wxlogin,
  createUser: createUser,
  changeUser: changeUser,
  getUsers: getUsers,
  getUserById: getUserById
}