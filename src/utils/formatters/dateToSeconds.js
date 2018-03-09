import moment from 'moment'

const begin = '1970-01-01'
const dateToSeconds = (date) => {
  return (date.diff(moment(begin)))
}
export default dateToSeconds
