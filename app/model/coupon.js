'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('coupon', {
    id: { type: STRING(32), primaryKey: true },
    couponType: { type: STRING(32), field: 'coupon_type' },
    description: { type: STRING(255), field: 'description' },
    days: { type: INTEGER, field: 'days' },
    code: { type: STRING(64), field: 'code' },
    userId: { type: STRING(255), field: 'user_id' },
    isRedeemed: { type: STRING(255), field: 'is_redeemed' },
    discountPercent: { type: STRING(255), field: 'discount_percent' },
    discountAmount: { type: STRING(255), field: 'discount_amount' },
    expirationDate: { type: INTEGER, field: 'expiration_date' },
    redeemedAt: { type: STRING(64), field: 'redeemed_at' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
