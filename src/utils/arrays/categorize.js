/**
 * To categorize the data by adding alphabet objects in between and cloning the finally array to avoid overriding
 * Eg [{label: 'Apple'}, {label: 'Banana'}, {label: 'Cucumber'}, {label: 'Carrot'}]
 * to
 *
 * {
 *   characters:['A', 'B', 'C'],
 *   results: [
  *    {label: 'A', type: 'alpha'}, {label: 'Apple'},
  *    {label: 'B', type: 'alpha'}, {label: 'Banana'},
  *    {label: 'C', type: 'alpha'}, {label: 'Cucumber'}, {label: 'Carrot'}
 *   ]
 * }
 */

import { clone, compare } from '../arrays'

export default (items, key) => {
  if (!key) { return [] }

  let results = []
  let alphabets = []
  let others = []

  let characters = []

  items.forEach(item => {
    if (item[key]) {
      /^[a-zA-Z]$/.test(item[key].charAt(0)) ? alphabets.push(item) : others.push(item)
    }
  })

  alphabets.sort(compare(key))
  others.sort(compare(key))

  let currentChar = null
  alphabets.forEach(item => {
    let firstChar = item[key].charAt(0).toUpperCase()
    if (currentChar !== firstChar) {
      currentChar = firstChar
      characters.push(currentChar)
      results.push({
        label: currentChar,
        type: 'alpha'
      })
    }

    results.push(item)
  })

  if (others.length) {
    results.push({
      label: 'Others',
      type: 'alpha'
    })
  }

  return {
    characters,
    results: clone([...results, ...others])
  }
}
