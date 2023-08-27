'use strict';
const BaseController = require('../core/base-controller');
const STS = require('qcloud-cos-sts');
// 配置参数
const config = {
  secretId: 'AKIDgP2SvTt664rOfiW3Kn6D66tTnrhLjqiO', // process.env.SecretId,
  secretKey: 'Xo6FApEPPBoLrDMTCpLfwHWcT7ezHNSX', // process.env.SecretKey,
  durationSeconds: 1800,
  bucket: 'mano-1315917957', // process.env.Bucket,
  region: 'ap-shanghai', // process.env.Region,
  // 允许操作（上传）的对象前缀，可以根据自己网站的用户登录态判断允许上传的目录，例子： user1/* 或者 * 或者a.jpg
  // 请注意当使用 * 时，可能存在安全风险，详情请参阅：https://cloud.tencent.com/document/product/436/40265
  allowPrefix: 'images/*',
  // 密钥的权限列表
  allowActions: [
    // 所有 action 请看文档 https://cloud.tencent.com/document/product/436/31923
    // 简单上传
    'name/cos:PutObject',
    'name/cos:PostObject',
    // 分片上传
    'name/cos:InitiateMultipartUpload',
    'name/cos:ListMultipartUploads',
    'name/cos:ListParts',
    'name/cos:UploadPart',
    'name/cos:CompleteMultipartUpload',
  ],
  // condition条件限定，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
  // condition:{
  //   // 比如限制该ip才能访问cos
  //   'ip_equal': {
  //       'qcs:ip': '192.168.1.1'
  //   }
  // }
};

class CommonController extends BaseController {
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async getSTS() {
    const AppId = config.bucket.substr(config.bucket.lastIndexOf('-') + 1);
    // 数据万象DescribeMediaBuckets接口需要resource为*,参考 https://cloud.tencent.com/document/product/460/41741
    const policy = {
      version: '2.0',
      statement: [{
        action: config.allowActions,
        effect: 'allow',
        resource: [
          'qcs::cos:' + config.region + ':uid/' + AppId + ':' + config.bucket + '/' + config.allowPrefix,
        ],
      }],
    };
    const startTime = Math.round(Date.now() / 1000);
    const result = await new Promise((resolve, reject) => {
      STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        region: config.region,
        durationSeconds: config.durationSeconds,
        // endpoint: 'sts.internal.tencentcloudapi.com', // 支持设置sts内网域名
        policy,
      }, function(err, tempKeys) {
        if (tempKeys) {
          tempKeys.startTime = startTime;
          resolve(tempKeys);
        } else {
          reject(err);
        }
      });
    });
    this.success(result);
  }
}

module.exports = CommonController;
