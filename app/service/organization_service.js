const { uuid } = require('../utils');
const { PAYMENT_TYPE, USER_TYPE } = require('../constants');

async function initializeOrgUser(ctx, authingUser) {
  const now = new Date(); // 获取当前时间
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()); // 加上一个月
  const orgId = uuid(32);
  const org = await ctx.model.Organization.create({
    id: orgId,
    seats: 1,
    orgName: '个人版',
    paymentType: PAYMENT_TYPE.BASIC,
    paymentExpired: nextMonth,
    limitProjects: 2,
    limitDocuments: 5,
    limitImages: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const user = await ctx.model.User.create({
    id: authingUser.data.userId,
    nickname: 'user',
    language: '',
    phone: authingUser.data.phone,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const orgUser = await ctx.model.OrganizationUser.create({
    organizationId: org.id,
    userId: user.id,
    userType: USER_TYPE.OWNER,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return orgUser;
}


module.exports = {
  initializeOrgUser,
};

