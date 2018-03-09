import { numberFormat } from '../formatters'

/*
Function to calculate options on the basis of data, valueKey and optionCount
* @param content - Entire data
* @param valueKey - The key in `content` whose range is to be divided
* @param optionCount - The number of intervals the range is to be divided apart from Below and Above option
* @param minRecords - The minimum number of entries each interval should have.
* @returns Array of options containing label and value
*/
const getAverageTimeOptions = (content, valueKey, optionCount, minRecords = 10) => {
  const values = content.map(value => numberFormat(parseFloat(value[valueKey], 10))) // creating a new array for the 'valueKey'
  values.sort((a, b) => a - b)

  const numOfRecords = values.length
  const minValue = values[0]
  const maxValue = values[numOfRecords - 1]
  const options = []

  if (numOfRecords <= minRecords) {
    return { content: options, min: minValue, max: maxValue }
  }

  const chunkSize = Math.ceil(numOfRecords / (optionCount + 2))

  let index = 0

  while (index < (numOfRecords - 1)) {
    let min = numberFormat(values[index] + 0.01)
    let max = values[index + chunkSize]

    if ((index + chunkSize) >= numOfRecords) {
      max = maxValue
    }

    options.push(
      {
        label: `${min} - ${max}`,
        value: {min, max}
      }
    )

    index = values.lastIndexOf(max)
  }

  if (options.length) {
    options[0].label = `Below ${options[0].value.max}`
    options[0].value = { 'min': minValue, 'max': options[0].value.max }
    if (options.length > 1) {
      options[options.length - 1].label = `Above ${options[options.length - 1].value.min}`
      options[options.length - 1].value = { 'min': options[options.length - 1].value.min, 'max': maxValue }
    }
  }

  return { content: options, min: minValue, max: maxValue }
}

export default getAverageTimeOptions
