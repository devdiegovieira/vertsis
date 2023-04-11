const upsertContact = async (pgConn, contacts = [], peopleId) => {

  for (let peopleContact of contacts) {

    const { name, phone, mail, notify = false, updated, deleted, id } = peopleContact;

    if (id == 'new' && !deleted) {
      // insert
      await pgConn.query(
        `insert into people_contact (people_id, name, phone, mail, notify) values ($1,$2,$3,$4,$5)`,
        [
          peopleId,
          name,
          Number(phone.match(/\d+/g).join('')),
          mail,
          notify]
      );
    }

    if (updated && id != 'new') {
      // update
      await pgConn.query(
        `update people_contact set name=$1, phone=$2, mail=$3,notify=$4 where id=$5`,
        [
          name,
          Number(phone.match(/\d+/g).join('')),
          mail,
          notify,
          id]
      );
    }

    if (deleted && id != 'new') {
      // delete
      await pgConn.query(
        `delete from people_contact where id = $1`,
        [id]
      );
    }
  }
}

module.exports = { upsertContact };