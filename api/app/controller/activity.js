'use strict';
const fdfs = require('../util/fdfsUtil');
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;

class activityController extends Controller {
  async index() {
    const stream = await this.ctx.getFileStream();
    const filename = encodeURIComponent(stream.filename) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    const tmparr = stream.filename.split('.');
    const extName = tmparr[tmparr.length - 1];
    const fileId = await fdfs.upload(target, {
      ext: extName,
    });
    await fs.unlink(target, err => {
      console.log('err ' + err);
    });
    console.log(fileId);
    this.ctx.body = {
      a: 11,
    };
  }

  async find() {
    const ctx = this.ctx;
    await ctx.service.activity.find(ctx.query);
  }
  async create() {
    const ctx = this.ctx;
    console.log(ctx.request.body);
    await ctx.service.activity.create(ctx.request.body);
  }

  async update() {
    const ctx = this.ctx;
    await ctx.service.activity.update(ctx.params._id, ctx.request.body);
  }
}

module.exports = activityController;
