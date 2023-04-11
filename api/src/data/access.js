const getAccessList = async (pgConn, user, filter = {}) => {

  let { dateStart, dateEnd, name, gate, group, notified, offset = 0, limit = 50 } = filter;

  let filterQuery = '';

  if (dateStart) filterQuery = filterQuery + `and a.date >= $4 `;
  if (dateEnd) filterQuery = filterQuery + `and a.date <= $5 `;
  if (name) filterQuery = filterQuery + `and lower(p.name) like '%${name.toLowerCase()}%' `;
  if (gate) filterQuery = filterQuery + `and lower(g.name) like '%${gate.toLowerCase()}%' `;
  if (group) filterQuery = filterQuery + `and lower(ug.name) like '%${group.toLowerCase()}%' `;


  if (notified && (notified == 'true' || notified == 'false')) filterQuery = filterQuery + `and a.notified = ${notified} `;


  const ret = await pgConn.one(
    `select count(1) as total 
     from access a 
     inner join people p on a.people_id=p.id  
     inner join partner pa on a.partner_id=pa.id
     inner join gate g on a.gate_id = g.id
     inner join unity_group ug on a.unity_group_id = ug.id
     where a.partner_id = $1 ${filterQuery}`,
    [user.partner_id,0,0, new Date(dateStart), new Date(dateEnd)]
  );

  offset = Number(offset);
  limit = Number(limit);

  return {
    total: Number(ret.total),
    offset,
    limit,
    list: await pgConn.query(`
      select 
        p.name NamePeople,
        pa.name NamePartner,
        g.name NameGate,
        a.date,
        ug.name NameUnityGrop,
        a.notified,
        a.notified_date
      from access a
        inner join people p on a.people_id=p.id  
        inner join partner pa on a.partner_id=pa.id
        inner join gate g on a.gate_id = g.id
        inner join unity_group ug on a.unity_group_id = ug.id
      where a.partner_id = $1 ${filterQuery}
      order by
        a.date desc
      LIMIT $2
      OFFSET $3
    `, [user.partner_id, limit, offset, new Date(dateStart), new Date(dateEnd)])
  };
}

const getAccessCounterByGroup = async (pgConn, user) => {
  const dates = await pgConn.query(
    `Select     
      a.date::date dayaccess
    from access a
    where a.date::date >= now()::date - 15
    and a.date::date <= now()::date
    and a.partner_id=$1
    group by a.date::date
    order by a.date::date`
    , [user.partner_id]
  )

  const counterByDate = await pgConn.query(
    `Select 
      count(1), 
      a.date::date dayaccess,
      ug.name
    from access a
      inner join unity_group ug on a.unity_group_id=ug.id
    where a.date::date >= now()::date - 15
    and a.date::date <= now()::date
    and a.partner_id=$1
    group by a.unity_group_id, ug.name, a.date::date
    order by  a.date::date`
    , [user.partner_id]
  )

  let datesRet = dates.map(m => {
    let props = {};

    counterByDate.filter(f =>
      f.dayaccess.toLocaleDateString() == m.dayaccess.toLocaleDateString()).map(mm => {
        return { ...mm, dayaccess: mm.dayaccess.toLocaleDateString() }
      }
      ).forEach(e => {
        props[e.name] = e.count
      });

    return {
      dayaccess: m.dayaccess.toLocaleDateString('pt-Br', { dateStyle: 'short' }),
      ...props
    }
  })

  return {
    dates: datesRet, groups: counterByDate.map(m => m.name).filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
  }
}

const getLastIntegrationDate = async (pgConn, user) => {
  const date = await pgConn.one
    (
      `select max(last_execute::date) last_integration from service where partner_id = $1`,
      [user.partner_id]
    );

  return date.last_integration ?
    `${date.last_integration.getDate().toString().padStart(2, '0')}/${(date.last_integration.getMonth() + 1).toString().padStart(2, '0')}/${date.last_integration.getFullYear()}` :
    '';
}

const getCounters = async (pgConn, user) => {
  return await pgConn.one(`
    select (
      select count(1) 
      from people p 
      where not exists (
        select 1 
        from people_picture pp 
        where pp.people_id = p.id
      )
      and partner_id=$1
      ) noPic,
      (
        select count(1) 
        from people p 
        where exists (
          select 1 
          from people_picture pp 
          where pp.people_id = p.id
        )
        and partner_id=$1
      ) pic,
      (
        select count(1) 
        from access 
        where success = false 
          and date::date = now()::date 
          and partner_id=$1
      ) erro,
      (
        select count(1) 
          from people p
          where p.partner_id=$1
          and (
          select count(1)  
          from access 
            where date::date = now()::date
              and direction = 'in'
              and people_id = p.id) >
          (
          select count(1)  
          from access 
            where date::date = now()::date
              and direction = 'out'
              and people_id = p.id) 	  
      ) peopleIn
  `, [user.partner_id])
}

module.exports = { getAccessList, getAccessCounterByGroup, getLastIntegrationDate, getCounters }