const { ObjectId } = require("mongodb");
const { escapeSpecialChar } = require("../utils/replaces");

const getBlocks = async (mongoConn, filters = {}) => {
  const blockColl = mongoConn.collection('block');

  const {
    offset = 0,
    limit = 10,
    search = '',
    showInative = 'false'
  } = filters;

  let filterQuery = {};

  if (search) filterQuery.$or = [
    { code: new RegExp(escapeSpecialChar(search), "i") },
    { name: new RegExp(escapeSpecialChar(search), "i") },
  ];

  if (showInative == 'false') filterQuery.active = true;

  blocks = await blockColl.find(filterQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .toArray();

  return blocks;
}

const getBlock = async (mongoConn, id = '') => {
  const blockColl = mongoConn.collection('block');
  return await blockColl.findOne({ _id: new ObjectId(id) });
}

const isUnique = async (mongoConn, code, _id) => {
  const filter = { code };
  if (_id) filter._id = { $ne: _id };

  return (await mongoConn.collection('block').findOne(filter)) == undefined;
}

const upsertBlock = async (mongoConn, fields = {}, user) => {
  const blockColl = mongoConn.collection('block');

  let { _id } = fields;
  delete fields._id;

  if (!_id) {
    if (!fields.code) throw 'Código é obrigatorio';
    if (!fields.name) throw 'Nome é obrigatorio';
    if (fields.active == undefined) throw 'Status é obrigatório';
    if (!(await isUnique(mongoConn, fields.code)))
      throw `O código ${fields.code} já existe por favor cadastre um código diferente`;

    await blockColl.insertOne({
      ...fields,
      createdAt: new Date(),
      createdUser: new ObjectId(user._id)
    });
  }
  else {
    if (!(await isUnique(mongoConn, fields.code, new ObjectId(_id))))
      throw `O código ${fields.code} já existe por favor cadastre um código diferente`;

    await blockColl.updateOne({ _id: new ObjectId(_id) }, { $set: fields });
  }
}

const deleteBlock = async (mongoConn, id) => {
  const blockColl = mongoConn.collection('block');
  const unityColl = mongoConn.collection('unity');

  const block = await blockColl.findOne({ _id: new ObjectId(id) });
  if (!block) throw `Bloco ${id} não existe`;

  const unity = await unityColl.findOne({ blockId: block._id })
  if (unity) throw 'Não é permitido deletar este bloco, pois existem unidades vinculadas a ele';

  await blockColl.deleteOne({ _id: block._id });
}


module.exports = { getBlocks, upsertBlock, getBlock, deleteBlock }