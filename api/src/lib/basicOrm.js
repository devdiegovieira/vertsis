const get = async (pgConn, tableName = '', columns = [], filters = {}) => {
  let queryParams = [];

  let queryFilter = Object.keys(filters).map((m, i) => { 
    queryParams.push(typeof filters[m] == 'string' ? filters[m].toLowerCase() : filters[m])
    return `${i != 0 ? 'and' : ''} ${typeof filters[m] == 'string' ? `LOWER(${m})` : m} = $${i+1}`
  })

  let queryColumns = !columns.length ? '*' : columns.join(', ');

  let query =
    `select ${ queryColumns } from ${ tableName } ${ !Object.keys(filters).length ? '' : `where ${ queryFilter }` }`

  return await pgConn.query(query, queryParams)
}

module.exports = { get }