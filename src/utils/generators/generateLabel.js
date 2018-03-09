import { filterTypes } from '../configurations/filtersConfig'
import { dateToSeconds } from '../formatters'

export default (value, type) => {
  if (type === filterTypes.Numeric) {
    return `${value.min}-${value.max}`
  } else if (type === filterTypes.Date) {
    let label = value.type
    if (value.type === 'custom') {
      label += `-${dateToSeconds(value.startDate)}-${dateToSeconds(value.endDate)}`
    }
    return label
  } else {
    return value
  }
}
