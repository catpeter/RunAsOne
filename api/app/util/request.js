'use strict';

exports.post = async (ctx, url, data) => {
  const result = await ctx.curl(url, {
    // 必须指定 method
    method: 'POST',
    // 通过 contentType 告诉 httpclient 以 JSON 格式发送
    contentType: 'json',
    data,
    // 明确告诉 httpclient 以 JSON 格式处理响应 body
    dataType: 'json',
  });
  return result;
};
exports.del = async (ctx, url) => {
  const result = await ctx.curl(url, {
    // 必须指定 method
    method: 'DELETE',
    dataType: 'json',
  });
  return result;
};
exports.put = async (ctx, url, data) => {
  const result = await ctx.curl(url, {
    // 必须指定 method
    method: 'PUT',
    // 通过 contentType 告诉 httpclient 以 JSON 格式发送
    contentType: 'json',
    data,
    // 明确告诉 httpclient 以 JSON 格式处理响应 body
    dataType: 'json',
  });
  return result;
};
exports.get = async (ctx, url, data) => {
  const result = await ctx.curl(url, {
    // 必须指定 method
    method: 'GET',
    // 通过 contentType 告诉 httpclient 以 JSON 格式发送
    contentType: 'json',
    data,
    // 明确告诉 httpclient 以 JSON 格式处理响应 body
    dataType: 'json',
  });
  return result;
};

// function end(req) {
//   return new Promise((resolve, reject) => {
//     req.on('end', resolve);
//     req.on('error', reject);
//   });
// }
