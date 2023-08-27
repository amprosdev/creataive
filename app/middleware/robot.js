module.exports = options => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  };
};

// config/config.default.js
// add middleware robot
exports.middleware = [ 'robot' ];
// robot's configurations
exports.robot = {
  ua: [ /Baiduspider/i ],
};
