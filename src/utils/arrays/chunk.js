/**
 * Splitting the array into equal partitions and cloning the objects
 */

import clone from './clone'

export default (items, size = 6) => {
  let result = []

  for (let i = 0, j = items.length; i < j; i += size) {
    result.push(clone(items.slice(i, i + size)))
  }

  return result
}
