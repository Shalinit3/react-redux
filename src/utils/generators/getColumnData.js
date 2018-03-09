import { pascalCase } from '../formatters'

const getColumnData = (data = []) => {
  const columns = []
  if (data.length) {
    const keys = Object.keys(data[0])
    const values = Object.values(data[0])
    keys.forEach((value, index) => {
      if (typeof (values[index]) === 'string' && values[index].length) {
        const name = pascalCase(value)
        columns.push({
          label: name,
          key: value
        })
      }
    })
  }
  return (columns)
}
export default getColumnData
