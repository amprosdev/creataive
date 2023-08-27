const { ManagementClient } = require('authing-node-sdk');
const usersManagement = new ManagementClient({
  // 需要替换成你的 Authing Access Key ID
  accessKeyId: '63c4d311d9901db34a666228',
  // 需要替换成你的 Authing Access Key Secret
  accessKeySecret: 'd8591e7bb30a71116a0d91eed0bd191d',
  // 如果是私有化部署的客户，需要设置 Authing 服务域名
  // host: 'https://api.your-authing-service.com'
});

module.exports = {
  usersManagement,
};
