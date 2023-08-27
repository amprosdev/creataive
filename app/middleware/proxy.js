const axios = require('axios');

module.exports = () => {
  return async function(ctx, next) {
    const url = 'http://18.139.224.172:8000' + ctx.url.substring(6); // 去掉 /proxy
    const method = ctx.method; // 获取请求的方法
    const data = ctx.request.body; // 获取请求的数据
    const headers = ctx.request.headers; // 获取请求的头部信息
    console.log(url);
    if (ctx.header.accept && ctx.header.accept === 'text/event-stream') { // 如果请求的 Accept 头部信息是 text/event-stream，则表示是 SSE 请求
      try {
        const hasPermission = true;
        if (hasPermission) {
          // 如果当前用户具有权限，调用 Python 的 SSE 接口
          const res = await ctx.curl(url, {
            streaming: true, // 启用流式传输
            followRedirect: true, // 启用重定向
            dataType: 'stream', // 返回流对象
          });
          // 将 Python 的 SSE 数据流转发给前端
          ctx.set(res.headers);
          ctx.body = res.res;
        } else {
          // 如果当前用户不具有权限，返回 403 错误
          ctx.status = 403;
          ctx.body = 'Forbidden';
        }
      } catch (error) {
        ctx.status = error.response.status;
        ctx.body = String(error.response.data) || Buffer.from('');
      }
    } else { // 否则，正常转发请求
      try {
        const response = await axios({ url, method, data, headers });
        ctx.status = response.status;
        ctx.body = response.data || Buffer.from('');
      } catch (error) {
        ctx.status = error.response.status;
        ctx.body = error.response.data || Buffer.from('');
      }
    }
    await next();
  };
};
