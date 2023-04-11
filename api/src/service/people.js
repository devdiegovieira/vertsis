
const { newPic, deletePic, getPeopleDetail } = require("../data/people");
const { uploadToStorage,  deleteFromStorage } = require("./storage")

const uploadPeopleImage = async (pgConn, userPics, peopleId) => {
  if (!Array.isArray(userPics)) userPics = [userPics];
  let links = await uploadToStorage(pgConn, userPics);
  await newPic(pgConn, peopleId, links);
}

const deletePeopleImages = async (pgConn, user, pictures, peopleId) => {
  if (!Array.isArray(pictures)) pictures = [pictures];

  const retorno = await getPeopleDetail(pgConn, user, peopleId);
  if (!retorno) throw 'Usuário Logado não tem acesso a essa pessoa'
  await deletePic(pgConn, peopleId, pictures);
  await deleteFromStorage(pgConn, pictures);
}

module.exports = { uploadPeopleImage, deletePeopleImages }