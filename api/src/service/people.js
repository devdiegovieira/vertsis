const { ObjectId } = require("mongodb");
const { escapeSpecialChar } = require("../utils/mongo");

const getPeoples = async (mongoConn, filters = {}) => {
  const peopleColl = mongoConn.collection('people');
  const unityColl = mongoConn.collection('unity');
  const peopleTypeColl = mongoConn.collection('peopleType');

  const {
    offset = 0,
    limit = 10,
    search = '',
    showInative = 'false'
  } = filters;

  let filterQuery = {};

  if (search) filterQuery.$or = [
    { name: new RegExp(".*" + escapeSpecialChar(search) + ".*", "i") },
    { cpf: new RegExp(".*" + escapeSpecialChar(search) + ".*", "i") },
    { birth: new RegExp(".*" + escapeSpecialChar(search) + ".*", "i") },
    { phone: new RegExp(".*" + escapeSpecialChar(search) + ".*", "i") },
  ];

  if (showInative == 'false') filterQuery.active = true;

  const peoples = await peopleColl.find(filterQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .toArray();

  const unitsByPeople = await unityColl.find({
    _id: {
      $in: peoples.map(m => m.unityId)
    }
  }).toArray();

  const peopleType = await peopleTypeColl.find({
    _id: {
      $in: peoples.map(m => m.peopleType)
    }
  }).toArray();


  return peoples.map(m => {
    return {
      ...m,
      units: unitsByPeople.filter(f => f._id.equals(m.unityId)),
      peopleType: peopleType.find(f => f._id.equals(m.peopleType))
    }
  })
}

const getPeople = async (mongoConn, id = '') => {
  const poepleColl = mongoConn.collection('people');
  return await poepleColl.findOne({ _id: new ObjectId(id) });
}

const isUnique = async (mongoConn, cpf, _id) => {
  const filter = { cpf };
  if (_id) filter._id = { $ne: _id };

  return (await mongoConn.collection('people').findOne(filter)) == undefined;
}

const upsertPeople = async (mongoConn, fields = {}, user) => {
  const peopleColl = mongoConn.collection('people');

  let { _id } = fields;
  delete fields._id;

  if (fields.unityId) {
    fields.unityId = new ObjectId(fields.unityId);
  }

  if (fields.peopleType) {
    fields.peopleType = new ObjectId(fields.peopleType);
  }

  if (!_id) {
    if (!fields.name) throw 'Nome é obrigatorio';
    if (fields.active == undefined) throw 'Status é obrigatório';
    if (!(await isUnique(mongoConn, fields.cpf)))
      throw `O código ${fields.code} já existe por favor cadastre um código diferente`;


    await peopleColl.insertOne({
      ...fields,
      createdAt: new Date(),
      createdUser: new ObjectId(user._id)
    });
  }
  else {
    if (!(await isUnique(mongoConn, fields.cpf, new ObjectId(_id))))
      throw `O código ${fields.code} já existe por favor cadastre um código diferente`;

    await peopleColl.updateOne({ _id: new ObjectId(_id) }, { $set: fields });
  }
}

const deletePeople = async (mongoConn, id) => {
  const peopleColl = mongoConn.collection('people');
  const accessColl = mongoConn.collection('access');

  const people = await peopleColl.findOne({ _id: new ObjectId(id) });
  if (!people) throw `Pessoa ${id} não existe`;

  const access = await accessColl.findOne({ peopleId: people._id })
  if (access) throw 'Não é permitido deletar esta pessoa, pois existem acessos vinculadas a ela';

  await peopleColl.deleteOne({ _id: people._id });
}

module.exports = { getPeoples, upsertPeople, getPeople, deletePeople }