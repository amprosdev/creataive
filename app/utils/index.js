const AWS = require('aws-sdk');

function uuid(len = 32) {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

const s3 = new AWS.S3({
  accessKeyId: 'AKIA2V5OTJM6SQRFRMAP',
  secretAccessKey: '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',
});

function uploadFileToS3(uploadParams) {
  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getSignedUrl(asset) {
  const params = {
    Bucket: asset.bucket,
    Key: asset.key,
    Expires: 3600, // 过期时间为1小时
  };
  return s3.getSignedUrl('getObject', params);
}

module.exports = {
  uuid,
  toInt,
  uploadFileToS3,
  getSignedUrl,
};
