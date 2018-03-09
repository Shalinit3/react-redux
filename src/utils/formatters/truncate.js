/**
 * This will truncate the string if provided than the passed size and append ".." as well
 * - pass `dot` as false to hide ".."
 */

export default ({value, size = 10, dot = true}) => {
  return value && value.length > size ? (`${value.slice(0, size)}${dot ? '..' : ''}`) : value
}
