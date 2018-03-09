/**
 * Cloning of array of objects
 */

export default (items) => {
  return items.map(item => Object.assign({}, item))
}
