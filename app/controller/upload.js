'use strict';
const BaseController = require('../core/base-controller');
// 临时密钥服务例子
const crypto = require('crypto');

// 配置参数
const config = {
  // 获取腾讯云密钥，建议使用限定权限的子用户的密钥 https://console.cloud.tencent.com/cam/capi
  secretId: 'AKIDgP2SvTt664rOfiW3Kn6D66tTnrhLjqiO',
  secretKey: 'Xo6FApEPPBoLrDMTCpLfwHWcT7ezHNSX',
  // 这里填写存储桶、地域，例如：test-1250000000、ap-guangzhou
  bucket: 'mano-1315917957',
  region: 'ap-shanghai',
  // 限制的上传后缀
  extWhiteList: [ 'jpg', 'jpeg', 'png', 'gif', 'bmp' ],
};

const randomString = (len = 12) => {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
};

// 生成要上传的 COS 文件路径文件名
const generateCosKey = function(ext) {
  return `${randomString()}.${ext}`;
};

class UploadController extends BaseController {
  /**
   * 新增
   * @return {Promise<void>}
   */
  async postPolicy() {
    const ctx = this.ctx;
    const { ext } = ctx.query;
    // 判断异常情况
    if (!config.secretId || !config.secretKey) return this.error('secretId or secretKey not ready');
    if (!config.bucket || !config.region) return this.error('bucket or regions not ready');
    if (!config.extWhiteList.includes(ext)) return this.error('ext not allow');
    // 开始计算凭证
    const cosHost = `${config.bucket}.cos.${config.region}.myqcloud.com`;
    const cosKey = generateCosKey(ext);
    const now = Math.round(Date.now() / 1000);
    const exp = now + 900;
    const qKeyTime = now + ';' + exp;
    const qSignAlgorithm = 'sha1';
    // 生成上传要用的 policy
    // PostObject 签名保护文档 https://cloud.tencent.com/document/product/436/14690#.E7.AD.BE.E5.90.8D.E4.BF.9D.E6.8A.A4
    const policy = JSON.stringify({
      expiration: new Date(exp * 1000).toISOString(),
      conditions: [
        // {'acl': query.ACL},
        // ['starts-with', '$Content-Type', 'image/'],
        // ['starts-with', '$success_action_redirect', redirectUrl],
        // ['eq', '$x-cos-server-side-encryption', 'AES256'],
        { 'q-sign-algorithm': qSignAlgorithm },
        { 'q-ak': config.secretId },
        { 'q-sign-time': qKeyTime },
        { bucket: config.bucket },
        { key: cosKey },
      ],
    });

    // 步骤一：生成 SignKey
    const signKey = crypto.createHmac('sha1', config.secretKey).update(qKeyTime).digest('hex');

    // 步骤二：生成 StringToSign
    const stringToSign = crypto.createHash('sha1').update(policy).digest('hex');

    // 步骤三：生成 Signature
    const qSignature = crypto.createHmac('sha1', signKey).update(stringToSign).digest('hex');


    // 返回域名、文件路径、凭证信息
    this.success({
      cosHost,
      cosKey,
      policy: Buffer.from(policy).toString('base64'),
      qSignAlgorithm,
      qAk: config.secretId,
      qKeyTime,
      qSignature,
      // securityToken: securityToken, // 如果 SecretId、SecretKey 是临时密钥，要返回对应的 sessionToken 的值
    });
    // const {organizationId, userId} = this.user;
  }
}

module.exports = UploadController;
