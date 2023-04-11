const { updatePic } = require("../data/systemUser");
const { uploadToStorage } = require("./storage")

const uploadProfileImage = async (pgConn, userPic, userId) => {
  let link = await uploadToStorage(pgConn, [userPic]);
  await updatePic(pgConn, link[0], userId);
}

module.exports = { uploadProfileImage }