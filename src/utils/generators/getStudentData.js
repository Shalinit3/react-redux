import alasql from 'alasql'

export default (apiData, key, value) => {
  const data = alasql(` SELECT * FROM ?  WHERE ${key} === '${value}' `, [apiData])
  return data
}
