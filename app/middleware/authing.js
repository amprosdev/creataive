'use strict';

module.exports = secret => {
  return async function verifyToken(ctx, next) {
    // 若是没有 token，返回的是 null 字符串
    const token = ctx.request.header.authorization;
    const organizationId = ctx.request.header.organization;
    const allowedUrls = [ 'wx-base', '/mine/redeem', 'login' ];
    if (allowedUrls.some(url => ctx.request.req.url.includes(url))) {
      await next();
      return;
    }
    if (!token) {
      // token 不存在
      ctx.status = 200;
      ctx.body = {
        status: 401,
        desc: '组织ID 或 token 不存在',
      };
      return;
    }

    function excludeEmptyValues(obj) {
      // 使用 Object.entries() 获取 JSON 对象的键值对数组
      return Object.fromEntries(
        Object.entries(obj)
          .filter(([ , value ]) => {
            // 排除值为空、null 或 undefined 的键值对
            return value !== '' && value !== null && value !== undefined;
          })
      );
    }

    // 有 token 需要校验
    try {
      const decode = ctx.app.jwt.verify(token, secret);
      console.log('decode', decode);
      console.log('token', token);
      console.log('secret', secret);
      const verified = decode.email_verified || decode.phone_number_verified;
      ctx.state.user = { ...decode.data, organizationId, verified };
      const { email } = decode;
      // 更新用户数据
      const update = excludeEmptyValues({
        email,
      });
      if (!Object.keys(update).length) {
        await ctx.model.User.update(update, {
          where: {
            id: ctx.state.user.userId,
          },
        });
      }
      await next();
    } catch (error) {
      if (error.status) {
        ctx.body = error;
      } else {
        // todo correct the condition judgement
        console.log('error', error);
        ctx.status = 200;
        ctx.body = {
          status: 401,
          desc: 'token已过期，请重新登录',
        };
      }
    }
  };
};
