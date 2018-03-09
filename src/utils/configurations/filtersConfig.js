export const filterTypes = {
  Alphabetic: 'AlphabeticFilter',
  Numeric: 'NumericFilter',
  Date: 'DatePickerFilter'
}

export const filterKeys = {
  date: 'date',
  module: 'moduleName',
  lesson: 'lessonName',
  facilitators: 'facilitatorURI',
  avgTime: 'averageResponseTime',
  studentId: 'studentURI',
  attempts: 'attemptNumber'
}
/*
    Function returns the config for various dashboard routes.
*/
const getConfig = (key) => {
  if (key === 'user') {
    return {
      filters: [
        { title: 'Date', name: 'date', key: filterKeys.date, type: filterTypes.Date, priority: 1 },
        { title: 'Modules', name: 'modules', key: filterKeys.module, type: filterTypes.Alphabetic, priority: 2 },
        { title: 'Lessons', name: 'lessons', key: filterKeys.lesson, type: filterTypes.Alphabetic, priority: 3 },
        { title: 'Facilitators', name: 'facilitators', key: filterKeys.facilitators, type: filterTypes.Alphabetic, priority: 4 },
        { title: 'Average Time (sec)', name: 'averageTime', key: filterKeys.avgTime, type: filterTypes.Numeric, priority: 5, isDistinct: true }
      ]
    }
  }
  return {
    filters: [
      { title: 'Date', name: 'date', key: filterKeys.date, type: filterTypes.Date, priority: 1 },
      { title: 'Modules', name: 'modules', key: filterKeys.module, type: filterTypes.Alphabetic, priority: 2 },
      { title: 'Lessons', name: 'lessons', key: filterKeys.lesson, type: filterTypes.Alphabetic, priority: 3 },
      { title: 'Facilitators', name: 'facilitators', key: filterKeys.facilitators, type: filterTypes.Alphabetic, priority: 4 },
      { title: 'Average Time (sec)', name: 'averageTime', key: filterKeys.avgTime, type: filterTypes.Numeric, priority: 5 }
    ]
  }
}
export default getConfig
