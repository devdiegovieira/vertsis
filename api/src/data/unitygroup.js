const upsertUnityGroupMaster = async (pgConn, unityId, user) => {

  let ret = await pgConn.query(
    `INSERT INTO public.unity_group(name, created_user, unity_id)
        VALUES ('Master', $1, $2) RETURNING id`,
    [user.id, unityId]
  );
  return ret[0].id;
}

const selectUnityGroupMaster = async (pgConn,unityId) => {

  let ret = await pgConn.one(
    `select id from unity_group where unity_id=$1 and id_sup is null limit 1`,
    [unityId]
  );  
  return ret.id;
}

module.exports = { upsertUnityGroupMaster, selectUnityGroupMaster };