const upsertDocument = async (pgConn, documents = [], peopleId) => {

  for (let peopleDocument of documents) {

    const { document, type, updated, deleted, id } = peopleDocument;

    if (peopleDocument.id == 'new' && !deleted) {
      // insert
      await pgConn.query(
        `insert into people_document (people_id, document, type) values ($1,$2,$3)`,
        [peopleId, document, type]
      );
    }

    if (updated && id != 'new') {
      // update
      await pgConn.query(
        `update people_document set people_id=$1, document=$2, type=$3 where id=$4`,
        [peopleId, document, type, id]
      );
    }

    if (deleted && id != 'new') {
      // delete
      await pgConn.query(
        `delete from people_document where id = $1`,
        [id]
      );
    }
  }
}

module.exports = { upsertDocument };