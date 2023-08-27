const BaseController = require('../core/base-controller');
const fs = require('fs');
const { uuid, uploadFileToS3 } = require('../utils');


class UploadAwsController extends BaseController {
  async uploadFile() {
    const { ctx } = this;
    const { filename, filepath } = ctx.request.files[0];
    const bucketName = 'creataive-public';

    const fileStream = fs.createReadStream(filepath);

    fileStream.on('error', err => {
      console.log('File Error', err);
    });
    const ext = filename.split('.').pop();
    const uploadParams = {
      Bucket: bucketName,
      Key: uuid() + '.' + ext,
      Body: fileStream,
    };

    try {
      const result = await uploadFileToS3(uploadParams);
      this.success(result);
    } catch (err) {
      this.error(err.message);
    }
  }
}

module.exports = UploadAwsController;
