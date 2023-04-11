const upsertGate = async (pgConn, gates = [], unityId, user = {}, unity_group_id) => {

  for (let gate of gates) {

    const { direction, id, ip_address, name, gate_user, gate_password, updated, deleted } = gate;

    if (id == 'new' && !deleted) {
      // insert
      let gate = await pgConn.query(
        `insert into gate (direction, ip_address, name, gate_user, gate_password, unity_id, created_user) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [direction, ip_address, name, gate_user, gate_password, unityId, user.id]
      );
      await pgConn.query(
        `INSERT INTO gate_x_unity_group(
          gate_id, unity_group_id)
          VALUES ($1, $2);`,
        [gate[0].id, unity_group_id]
      );
    }

    if (updated && id != 'new') {
      // update
      await pgConn.query(
        `update gate set direction = $1, ip_address = $2, name = $3, gate_user = $4, gate_password = $5 where id = $6`,
        [direction, ip_address, name, gate_user, gate_password, id]
      );
    }

    if (deleted && id != 'new') {
      // delete
      await pgConn.query(
        `delete from gate where id = $1`,
        [id]
      );
    }
  }
}

module.exports = { upsertGate };
