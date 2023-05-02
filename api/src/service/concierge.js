const { ObjectId } = require("mongodb");
const { escapeSpecialChar } = require("../utils/mongo");

const getConcierges = async (mongoConn, filters = {}) => {
  const conciergeColl = mongoConn.collection('concierge');

  const {
    offset = 0,
    limit = 10,
    search = '',
    showInative = 'false'
  } = filters;

  let filterQuery = {};

  if (search) filterQuery.$or = [
    { name: new RegExp(escapeSpecialChar(search), "i") },
  ];

  if (showInative == 'false') filterQuery.active = true;

  const concierges = await conciergeColl.find(filterQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .toArray();

  return concierges;
}

const getConcierge = async (mongoConn, id = '') => {
  const conciergeColl = mongoConn.collection('concierge');
  return await conciergeColl.findOne({ _id: new ObjectId(id) });
}

const isUnique = async (mongoConn, name, _id) => {
  const filter = { name };
  if (_id) filter._id = { $ne: _id };

  return (await mongoConn.collection('concierge').findOne(filter)) == undefined;
}

const upsertConcierge = async (mongoConn, fields = {}, user) => {
  const conciergeColl = mongoConn.collection('concierge');

  let { _id } = fields;
  delete fields._id;

  if (!_id) {
    if (!fields.name) throw 'Nome é obrigatorio';
    if (fields.active == undefined) throw 'Status é obrigatório';


    if (!(await isUnique(mongoConn, fields.name)))
      throw `O nome ${fields.name} já existe por favor cadastre um nome diferente`;

    await conciergeColl.insertOne({
      ...fields,
      createdAt: new Date(),
      createdUser: new ObjectId(user._id)
    });
  }
  else {
    if (!(await isUnique(mongoConn, fields.name, new ObjectId(_id))))
      throw `O nome ${fields.name} já existe por favor cadastre um nome diferente`;

    await conciergeColl.updateOne({ _id: new ObjectId(_id) }, { $set: fields });
  }
}

const deleteConcierge = async (mongoConn, id) => {
  const conciergeColl = mongoConn.collection('concierge');

  const accessType = await conciergeColl.findOne({ _id: new ObjectId(id) });
  if (!accessType) throw `Bloco ${id} não existe`;

  await conciergeColl.deleteOne({ _id: 'concierge'._id });
}


module.exports = { getConcierges, upsertConcierge, getConcierge, deleteConcierge }