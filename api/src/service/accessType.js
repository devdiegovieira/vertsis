const { ObjectId } = require("mongodb");
const { escapeSpecialChar } = require("../utils/replaces");

const getAccessTypes = async (mongoConn, filters = {}) => {
  const accessTypeColl = mongoConn.collection('accessType');

  const {
    offset = 0,
    limit = 10,
    search = '',
    showInative = 'false',
    concierge = 'false'
  } = filters;

  let filterQuery = {};

  if (search) filterQuery.$or = [
    { name: new RegExp(escapeSpecialChar(search), "i") },
  ];

  if (showInative == 'false') filterQuery.active = true;
  if (concierge == 'true') filterQuery.conciergeShow = true;

  const accessTypes = await accessTypeColl.find(filterQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .toArray();

  return accessTypes;
}

const getAccessType = async (mongoConn, id = '') => {
  const accessTypeColl = mongoConn.collection('accessType');
  return await accessTypeColl.findOne({ _id: new ObjectId(id) });
}

const isUnique = async (mongoConn, name, _id) => {
  const filter = { name };
  if (_id) filter._id = { $ne: _id };

  return (await mongoConn.collection('accessType').findOne(filter)) == undefined;
}

const upsertAccessType = async (mongoConn, fields = {}, user) => {
  const accessTypeColl = mongoConn.collection('accessType');

  let { _id } = fields;
  delete fields._id;

  if (!_id) {
    if (!fields.name) throw 'Nome é obrigatorio';
    if (fields.active == undefined) throw 'Status é obrigatório';


    if (!(await isUnique(mongoConn, fields.name)))
      throw `O nome ${fields.name} já existe por favor cadastre um nome diferente`;

    await accessTypeColl.insertOne({
      ...fields,
      createdAt: new Date(),
      createdUser: new ObjectId(user._id)
    });
  }
  else {
    if (!(await isUnique(mongoConn, fields.name, new ObjectId(_id))))
      throw `O nome ${fields.name} já existe por favor cadastre um nome diferente`;

    await accessTypeColl.updateOne({ _id: new ObjectId(_id) }, { $set: fields });
  }
}

const deleteAccessType = async (mongoConn, id) => {
  const accessTypeColl = mongoConn.collection('accessType');

  const accessType = await accessTypeColl.findOne({ _id: new ObjectId(id) });
  if (!accessType) throw `Bloco ${id} não existe`;

  await accessTypeColl.deleteOne({ _id: 'accessType'._id });
}


module.exports = { getAccessTypes, upsertAccessType, getAccessType, deleteAccessType }