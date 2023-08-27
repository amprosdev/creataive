'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/common/sts', controller.common.getSTS);
  router.resources('articles', '/articles', controller.articles);
  router.resources('projects', '/projects', controller.projects);
  router.get('/pictures/editor-pick', controller.pictures.getEditorPick);
  router.resources('picture', '/pictures', controller.pictures);
  router.resources('organization', '/organizations', controller.organization);
  router.resources('organization-users', '/organization-users', controller.organizationUsers);
  router.resources('/feedback', '/feedbacks', controller.feedback);
  router.resources('/assets', '/assets', controller.assets);
  router.get('/mine', controller.user.mine);
  router.put('/mine', controller.user.update);
  router.post('/mine/redeem', controller.user.redeem);
  router.resources('home', '/homes', controller.home);
  router.get('/uploads/post-policy', controller.upload.postPolicy);
  router.post('/upload/aws', controller.uploadAws.uploadFile);
  router.get('/wx-base/get-phone-number', controller.wxBase.getPhoneNumber);
  router.post('/wx-base/create-user-and-login', controller.wxBase.createUserIfNotExists);
  router.post('/wx-base/get-password', controller.wxBase.getPassword);
  router.post('/wx-base/push-user', controller.wxBase.pushUser);
  router.post('/wx-base/send-sms-code', controller.wxBase.sendSmsCode);
  router.post('/wx-base/phone-code-login', controller.wxBase.phoneCodeLogin);
  router.get('/wx-base/create-trial-account', controller.wxBase.createTrialAccount);
  router.post('/wx-base/bind-phone', controller.wxBase.bindPhone);
  router.resources('ppt', '/ppts', controller.ppt);
  router.post('/login', controller.login.login);
  router.resources('ppt-template', '/ppt-templates', controller.pptTemplate);
  router.resources('ppt-graphic', '/ppt-graphics', controller.pptGraphic);
  router.resources('ppt-chosen', '/ppt-chosen', controller.pptChosen);
};
