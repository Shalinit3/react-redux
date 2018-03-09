import alasql from 'alasql'

export default (optionKey, selectedItems, totalItems, type, data) => {
  const summary = []
  const key = `${type}Name`

  if (selectedItems.size) {
    selectedItems.forEach((item) => {
      const average = alasql(`VALUE OF SELECT AVG(CAST(${optionKey} as int)) FROM ? WHERE ${key} = '${item}' and ${optionKey} != 'N/A' `, [data]) || 0
      summary.push({value: average, label: item})
    })
  } else {
    totalItems.forEach((item) => {
      const average = alasql(`VALUE OF SELECT AVG(CAST(${optionKey} as int)) FROM ? WHERE ${key} = '${item.value}' and ${optionKey} != 'N/A' `, [data]) || 0
      summary.push({value: average, label: item.label})
    })
  }
  return summary
}
