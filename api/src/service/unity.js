const { ObjectId } = require("mongodb");

const getUnits = async (mongoConn, filters = {}) => {
  const unityColl = mongoConn.collection('unity');

  const {
    offset = 0,
    limit = 10,
    search = '',
    showInative = 'false'
  } = filters;

  let filterQuery = {};

  if (search) filterQuery.$or = [
    { code: search },
    { name: search },
  ];

  if (showInative == 'false') filterQuery.active = true;

  return await unityColl.find(filterQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .toArray();
}

const getUnity = async (mongoConn, id = '') => {
  const unityColl = mongoConn.collection('unity');
  return await unityColl.findOne({ _id: new ObjectId(id) });
}

const isUnique = async (mongoConn, code, _id) => {
  const filter = { code };
  if (_id) filter._id = { $ne: _id };

  return (await mongoConn.collection('unity').findOne(filter)) == undefined;
}

const upsertUnity = async (mongoConn, fields = {}, user) => {
  const unityColl = mongoConn.collection('unity');

  let { _id } = fields;
  delete fields._id;

  if (!_id) {
    if (!fields.code) throw 'Código é obrigatorio';
    if (!fields.name) throw 'Nome é obrigatorio';
    if (fields.active == undefined) throw 'Status é obrigatório';
    if (!(await isUnique(mongoConn, fields.code)))
      throw `O código ${fields.code} já existe por favor cadastre um código diferente`;

    await unityColl.insertOne({
      ...fields,
      createdAt: new Date(),
      createdUser: new ObjectId(user._id)
    });
  }
  else {
    if (!(await isUnique(mongoConn, fields.code, new ObjectId(_id))))
      throw `O código ${fields.code} já existe por favor cadastre um código diferente`;

    await unityColl.updateOne({ _id: new ObjectId(_id) }, { $set: fields });
  }

  return
}

const deleteUnity = async (mongoConn, id) => {
  const unityColl = mongoConn.collection('unity');
  const peopleColl = mongoConn.collection('people');

  const unity = await unityColl.findOne({ _id: new ObjectId(id) });
  if (!unity) throw `Bloco ${id} não existe`;

  const people = await peopleColl.findOne({ unityId: unity._id })
  if (people) throw 'Não é permitido deletar esta unidade, pois existem pessoas vinculadas a ela';

  await unityColl.deleteOne({ _id: unity._id });
}


module.exports = { getUnits, upsertUnity, getUnity, deleteUnity }