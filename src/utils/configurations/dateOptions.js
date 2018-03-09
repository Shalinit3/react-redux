import moment from 'moment'

export const dateTypes = {
  TODAY: 'today',
  LAST_7_DAYS: 'last7days',
  LAST_30_DAYS: 'last30days',
  THIS_MONTH: 'thismonth',
  PREV_MONTH: 'prevmonth',
  CUSTOM: 'custom'
}

export const dateOptions = [
  {
    data: {
      startDate: moment(),
      endDate: moment(),
      value: dateTypes.TODAY
    },
    content: 'Today'
  },
  {
    data: {
      startDate: moment().subtract(7, 'days'),
      endDate: moment(),
      value: dateTypes.LAST_7_DAYS
    },
    content: 'Last 7 Days'
  },
  {
    data: {
      startDate: moment().subtract(30, 'days'),
      endDate: moment(),
      value: dateTypes.LAST_30_DAYS
    },
    content: 'Last 30 Days'
  },
  {
    data: {
      startDate: moment().startOf('month'),
      endDate: moment(),
      value: dateTypes.THIS_MONTH
    },
    content: 'This Month'
  },
  {
    data: {
      startDate: moment().subtract(30, 'days').startOf('month'),
      endDate: moment().subtract(30, 'days').endOf('month'),
      value: dateTypes.PREV_MONTH
    },
    content: 'Previous Month'
  },
  {
    data: {
      startDate: moment(),
      endDate: moment(),
      value: dateTypes.CUSTOM
    },
    content: 'Custom Range'
  }
]
