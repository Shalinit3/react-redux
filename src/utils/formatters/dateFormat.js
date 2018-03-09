import moment from 'moment'

export default (date) => {
  if (date) {
    return moment(date).format('ll')
  }

  return null
}
