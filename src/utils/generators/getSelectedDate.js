import { dateTypes } from '../configurations/dateOptions'
import moment from 'moment'

const getSelectedDate = (value) => {
  let startDate = moment()
  let endDate = moment()
  let type = dateTypes.TODAY

  switch (value) {
    case dateTypes.TODAY:
      startDate = moment()
      endDate = moment()
      type = dateTypes.LAST_7_DAYS
      break
    case dateTypes.LAST_7_DAYS:
      startDate = moment().subtract(7, 'days')
      endDate = moment()
      type = dateTypes.LAST_7_DAYS
      break
    case dateTypes.LAST_30_DAYS:
      startDate = moment().subtract(30, 'days')
      endDate = moment()
      type = dateTypes.LAST_30_DAYS
      break
    case dateTypes.THIS_MONTH:
      startDate = moment().startOf('month')
      endDate = moment()
      type = dateTypes.THIS_MONTH
      break
    case dateTypes.PREV_MONTH:
      startDate = moment().subtract(30, 'days').startOf('month')
      endDate = moment().subtract(30, 'days').endOf('month')
      type = dateTypes.PREV_MONTH
      break
    default:
      startDate = moment()
      endDate = moment()
      type = dateTypes.TODAY
      break
  }

  return ({ startDate, endDate, type })
}

export default getSelectedDate
