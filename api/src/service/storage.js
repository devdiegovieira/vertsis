const { getConfigs } = require("../data/config")
const { uploadFile, deleteFile } = require("../lib/s3")

const uploadToStorage = async (pgConn, files) => {
  let configs = await getConfigs(pgConn, 'awsS3');

  if (!configs.find(f => f.key == 'accessKeyId')) throw 'Necessário cadastrar a config awsS3 > accessKeyId';
  const accessKeyId = configs.find(f => f.key == 'accessKeyId').value;

  if (!configs.find(f => f.key == 'secretAccessKey')) throw 'Necessário cadastrar a config awsS3 > secretAccessKey';
  const secretAccessKey = configs.find(f => f.key == 'secretAccessKey').value;

  if (!configs.find(f => f.key == 'bucket')) throw 'Necessário cadastrar a config awsS3 > accessKeyId';
  const bucket = configs.find(f => f.key == 'bucket').value;

  arrayUrl = []
  for (let file of files) {
    arrayUrl.push((await uploadFile(
      file.data,
      `image-${new Date().getTime()}-${Math.round(Math.random() * 10000)}.${file.name.split('.').slice(-1)[0]}`,
      accessKeyId,
      secretAccessKey,
      bucket
    )));

  }

  return arrayUrl;
}

const deleteFromStorage = async (pgConn, fileNames = []) => {
  let configs = await getConfigs(pgConn, 'awsS3');

  if (!configs.find(f => f.key == 'accessKeyId')) throw 'Necessário cadastrar a config awsS3 > accessKeyId';
  const accessKeyId = configs.find(f => f.key == 'accessKeyId').value;

  if (!configs.find(f => f.key == 'secretAccessKey')) throw 'Necessário cadastrar a config awsS3 > secretAccessKey';
  const secretAccessKey = configs.find(f => f.key == 'secretAccessKey').value;

  if (!configs.find(f => f.key == 'bucket')) throw 'Necessário cadastrar a config awsS3 > accessKeyId';
  const bucket = configs.find(f => f.key == 'bucket').value;

  for (let fileName of fileNames) {
    await deleteFile(fileName, accessKeyId, secretAccessKey, bucket)
  }
}

module.exports = { uploadToStorage, deleteFromStorage }