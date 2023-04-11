const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://vertsis:20vertsis23@cluster0.7tquh25.mongodb.net/?retryWrites=true&w=majority';

const openConnection = async () => {

  const client = new MongoClient(uri , { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  return client.db('vertsis');
}

module.exports = { openConnection }