const aws = require('aws-sdk');

const uploadFile = async (file, fileName, accessKeyId, secretAccessKey, bucket ) => {
  const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey
  });

  const params = {
    Bucket: bucket,
    Body: file,
    Key: fileName,
    ACL: 'public-read-write'
  };
  let uploaded = await s3.upload(params).promise()
  return uploaded.Location;
};

const deleteFile = async (fileName, accessKeyId, secretAccessKey, bucket) => {
  const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey
  });

  const params = {
    Bucket: bucket,
    Key: fileName
  }

  return await s3.deleteObject(params).promise();
};


module.exports = { uploadFile, deleteFile }