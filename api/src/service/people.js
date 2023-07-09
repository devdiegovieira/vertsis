const { ObjectId } = require("mongodb");
const { escapeSpecialChar } = require("../utils/replaces");
const { maskCpf, maskPhone } = require("../lib/masks");

const getPeoples = async (mongoConn, filters = {}) => {
  const peopleColl = mongoConn.collection('people');
  const unityColl = mongoConn.collection('unity');
  const accessTypeColl = mongoConn.collection('accessType');

  const {
    offset = 0,
    limit = 10,
    search = '',
    showInative = 'false'
  } = filters;

  let filterQuery = {};

  if (search) filterQuery.$or = [
    { name: new RegExp(".*" + escapeSpecialChar(search) + ".*", "i") },
    { cpf: new RegExp(".*" + maskCpf(search) + ".*", "i") },
    { rg: new RegExp(".*" + escapeSpecialChar(search) + ".*", "i") },
    { birth: new RegExp(".*" + escapeSpecialChar(search) + ".*", "i") },
    { phone: new RegExp(".*" + 
      maskPhone(
        search.replace('%28', '')
          .replace('%29', '')
          .replace(/\D/g, ""))
          .replace(' ', '.*') + ".*", "i") },
  ];

  if (showInative == 'false') filterQuery.active = true;

  const peoples = await peopleColl.find(filterQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .toArray();

  const unityIds = new Set();
  const accessTypeIds = new Set();

  peoples.forEach(people => {
    people.units.forEach(unity => {
      unityIds.add(unity.unityId);
      accessTypeIds.add(unity.accessTypeId);
    });
    // unityIds.()
  });

  const unitsByPeople = await unityColl.find({
    _id: {
      $in: Array.from(unityIds).map(m => new ObjectId(m))
    }
  }).toArray();

  const accessTypesByPeople = await accessTypeColl.find({
    _id: {
      $in: Array.from(accessTypeIds).map(m => new ObjectId(m))
    }
  }).toArray();


  return peoples.map(m => {
    return {
      ...m,
      units: m.units.map(unity => {
        return {
          unity: unitsByPeople.find(f => f._id.equals(new ObjectId(unity.unityId)) ),
          accessType: accessTypesByPeople.find(f => f._id.equals(new ObjectId(unity.accessTypeId)) )
        }
      })
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

  if (fields.accessTypeId) {
    fields.accessTypeId = new ObjectId(fields.accessTypeId);
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