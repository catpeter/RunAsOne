'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = this.ctx.service.user.find();
  }
}

module.exports = UserController;

