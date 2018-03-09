import alasql from 'alasql'
import { filterTypes } from '../configurations/filtersConfig'
import { dateToSeconds } from '../formatters'
import generateLabel from './generateLabel'

export default (item, value, filteredData) => {
  const { key, type, isDistinct } = item
  let selectedItems = []
  let filterData = new Set()

  let isDistinctCondition = !isDistinct ? `DISTINCT ${key}` : `${key} `

  let data = alasql(` SELECT  ${isDistinctCondition} FROM ?  WHERE ${key} != 'N/A' `, [filteredData])
    .map(value => { return { label: value[key], value: value[key] } })

  if ([...value].length || Object.keys(value).length) {
    let values
    switch (type) {
      case filterTypes.Alphabetic:
        filterData = value
        selectedItems = generateSelectedItems(value, item)
        filteredData = alasql(`SELECT * FROM ? WHERE ${key} IN @(?)`, [filteredData, [...value]])
        break
      case filterTypes.Numeric:
        filterData = value
        if (Object.keys(value).length) {
          selectedItems = [{ value, label: generateLabel(value, type), ...item }]
        }
        values = Object.values(value)
        console.log('Values----', values)
        filteredData = alasql(`SELECT * FROM ? WHERE ${key} BETWEEN ${String(values[0])} AND ${String(values[1])}`, [filteredData])
        break
      case filterTypes.Date:
        values = Object.values(value)
        let startDate = dateToSeconds(values[1])
        let endDate = dateToSeconds(values[2])
        filteredData = alasql(`SELECT * FROM ? WHERE ${key} BETWEEN ${String(startDate)} AND ${String(endDate)}`, [filteredData])
        break
      default:
    }
  }

  return {
    data,
    filteredData,
    selectedItems,
    filterData
  }
}

const generateSelectedItems = (selectedItems, item) => {
  const filterData = []
  selectedItems.forEach((value) => {
    filterData.push({ value: value, label: generateLabel(value, item.type), ...item })
  })
  return filterData
}
