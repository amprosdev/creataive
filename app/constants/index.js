// import BidirectionalDictionary from './dict';
//
// function USER_TYPE() {
//   const dict = new BidirectionalDictionary();
//   dict.add("OWNER", 0); // 拥有者
//   dict.add("ADMIN", 1); // 管理员
//   dict.add("COLLAB", 2); // 协作者
//   return dict;
// }

// function PAYMENT_TYPE() {
//   const dict = new BidirectionalDictionary();
//   dict.add("BASIC", 0); // 基础版本
//   dict.add("PREMIUM", 1); // 高级版
//   dict.add("ENTERPRISE", 2); // 企业用户
//   return dict;
// }

const PAYMENT_TYPE = {
  BASIC: 0,
  PREMIUM: 1,
  ENTERPRISE: 2,
  includes(value) {
    return Object.values(PAYMENT_TYPE).includes(value);
  },
};

const USER_TYPE = {
  OWNER: 0,
  ADMIN: 1,
  COLLAB: 2,
  includes(value) {
    return Object.values(USER_TYPE).includes(value);
  },
};

module.exports = {
  PAYMENT_TYPE,
  USER_TYPE,
};
