/**
 * Component will pass the data on the basis of route
 */

import React, { Component } from 'react'
import { Dimmer, Loader, Grid, Header, Icon, Button } from 'semantic-ui-react'
import moment from 'moment'
import qs from 'query-string'
import alasql from 'alasql'
import { connect } from 'react-redux'

import { dateTypes } from '../utils/configurations/dateOptions'
import { getSelectedDate, generateLabel, getFilterData, getSummary, getStudentData } from '../utils/generators'
import { fetchData } from '../data/fetchData'
import { filterTypes, filterKeys } from '../utils/configurations/filtersConfig'
import { getConfig } from '../utils/configurations'
import { apiUrl } from '../utils/configurations/apiUrl'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'

const mapStateToProps = (state = []) => {
    console.log('>>>>>>>>>', state)
    return {}
}

const dashboardHOC = (WrappedComponent, key) => {
  return connect(mapStateToProps)(class DashboardHOC extends Component {
    selectedLessons = new Set()
    selectedModules = new Set()
    selectedFacilitators = new Set()
    selectedDate = { type: dateTypes.TODAY, startDate: moment(), endDate: moment() }
    selectedAverageTime = {}
    selectedGraphModule = ''
    selectedGraphLesson = ''
    selectedSummaryKey= filterKeys.avgTime

    constructor (props) {
      super(props)
      const {
        selectedLessons,
        selectedModules,
        selectedFacilitators,
        selectedDate,
        selectedAverageTime,
        selectedGraphModule,
        selectedGraphLesson,
        selectedSummaryKey
      } = this

      this.state = {
        config: getConfig(key),
        modules: [],
        lessons: [],
        facilitators: [],
        averageTime: [],
        filteredData: [],
        filterData: [],
        selectedSummaryKey,
        selectedDate,
        selectedAverageTime,
        selectedModules,
        selectedLessons,
        selectedFacilitators,
        selectedGraphModule,
        selectedGraphLesson,
        barSummary: [],
        pieSummary: [],
        loading: true,
        activeIndexes: new Set(),
        errorScreen: false
      }
    }

    async componentWillMount () {
      await this.getQueryParams()
      this.updateState()
    }

    getFilterName = (item) => {
      return `selected${item.charAt(0).toUpperCase() + item.slice(1)}`
    }

    showErrorScreen = () => {
      this.setState({errorScreen: true, loading: false})
    }

    getData = async () => {
      try {
        const data = await fetchData(apiUrl.url)
        return data[0].lessonDetails
      } catch (err) {
        this.showErrorScreen()
        return null
      }
    }

    getQueryParams = async () => {
      const { history } = this.props
      const path = history.location.search.substr(1)

      if (path.length) {
        const selectedFilters = qs.parse(path, { arrayFormat: 'index' })

        Object.keys(selectedFilters).forEach((value) => {
          const filterName = this.getFilterName(value)
          let data = {}
          let values = []

          if (typeof (selectedFilters[value]) === 'string') {
            switch (value) {
              case 'date' :
                values = selectedFilters[value].split('-')
                const date = getSelectedDate(values[0])
                data.type = values[0]
                data.startDate = values[1] ? moment(Number(values[1])) : date.startDate
                data.endDate = values[2] ? moment(Number(values[2])) : date.endDate
                break
              case 'averageTime' :
                values = selectedFilters[value].split('-')
                data = { min: Number(values[0]), max: Number(values[1]) }
                break
              default:
                data = selectedFilters[value]
            }
          } else {
            data = new Set(selectedFilters[value])
          }

          this[filterName] = data
        })
      }
    }

    pushPath = (filterData) => {
      const { history } = this.props
      let path = qs.stringify(filterData, { arrayFormat: 'index' })
      history.push({ search: path })
    }

    getValue = (type, value) => {
      if (type === filterTypes.Alphabetic) {
        return [...value]
      }
      return generateLabel(value, type)
    }

     calculateState = async () => {
       const apidata = await this.getData()
       if (!apidata) {
         return null
       }
       let { config } = this.state
       const userid = this.props.match.params.userid
       let filteredData = (userid && key === 'user') ? getStudentData(apidata, 'studentURI', userid) : apidata
       config = alasql(`SELECT * FROM ?  ORDER BY priority`, [config.filters])

       let obj = {}
       let filters = []
       let queryFilters = {}

       config.forEach((item) => {
         const { name, type } = item
         const filterName = this.getFilterName(name)
         const value = this[filterName]
         const data = getFilterData(item, value, filteredData)

         obj[name] = data.data
         obj[filterName] = data.filterData
         filteredData = data.filteredData
         filters = filters.concat(data.selectedItems)

         if (Object.keys(value).length || [...value].length) {
           queryFilters[name] = this.getValue(type, value)
         }
         if (this.selectedGraphModule) {
           queryFilters.graphModule = this.selectedGraphModule
         }
         if (this.selectedGraphLesson) {
           queryFilters.graphLesson = this.selectedGraphLesson
         }
         queryFilters.summaryKey = this.selectedSummaryKey
       })
       let summary = this.calculateGraphSummary(filteredData, obj)
       this.pushPath(queryFilters)
       return { ...obj, filterData: filters, ...summary }
     }

    calculateGraphSummary = (filteredData, obj) => {
      const { selectedSummaryKey } = this
      let { selectedLessons, selectedModules, modules, lessons } = obj
      const { selectedGraphModule, selectedGraphLesson } = this
      let barSummary = getSummary(selectedSummaryKey, selectedModules, modules, 'module', filteredData)
      let item = { key: filterKeys.module, type: filterTypes.Alphabetic }

      if (selectedGraphModule) {
        filteredData = getFilterData(item, [selectedGraphModule], filteredData).filteredData
        item.key = filterKeys.lesson
        lessons = getFilterData(item, [], filteredData).data
      }

      let pieSummary = getSummary(selectedSummaryKey, selectedLessons, lessons, 'lesson', filteredData)

      if (selectedGraphLesson) {
        item.key = filterKeys.lesson
        filteredData = getFilterData(item, [selectedGraphLesson], filteredData).filteredData
      }

      return { barSummary, pieSummary, filteredData, selectedGraphModule, selectedGraphLesson, selectedSummaryKey }
    }

    updateState = async () => {
      const stateToUpdate = await this.calculateState()
      console.log('The Final State, to update', stateToUpdate)
      if (!stateToUpdate) {
        return false
      }
      this.setState({ ...stateToUpdate, selectedDate: this.selectedDate, loading: false, errorScreen: false })
    }

    handleGraphClick = (data, type) => {
      this.startLoader()
      const name = `selectedGraph${type.charAt(0).toUpperCase()}${type.slice(1)}`
      this.selectedGraphLesson = (type === 'module') ? '' : this.selectedGraphLesson
      this[name] = data.label
      this.updateState()
    }

    handleOptionsClick = (key) => {
      this.startLoader()
      this.selectedSummaryKey = key
      this.updateState()
    }

    handleFilterChange = (data, name, filterType) => {
      const filterName = this.getFilterName(name)
      this.startLoader()

      switch (filterType) {
        case filterTypes.Date:
          let { startDate, endDate, type } = data
          startDate = startDate || getSelectedDate(type).startDate
          endDate = endDate || getSelectedDate(type).endDate
          this[filterName] = { type, startDate, endDate }
          break

        case filterTypes.Numeric:
          this[filterName] = data
          break

        case filterTypes.Alphabetic:
          this[filterName] = new Set(data)
          break

        default:
      }
      this.selectedGraphLesson = ''
      this.selectedGraphModule = ''
      this.updateState()
    }

    updateAlphabetsFilters = (key, value) => {
      const filterName = this.getFilterName(key)
      this[filterName].delete(value)
    }

    updateNumericFilters = (key) => {
      const filterName = this.getFilterName(key)
      this[filterName] = {}
    }

    clearAllFilters = () => {
      this.selectedLessons = new Set()
      this.selectedModules = new Set()
      this.selectedFacilitators = new Set()
      this.selectedAverageTime = {}
    }

    onMenuChange = (index) => {
      console.log('Inside the menu change', index)
      const { activeIndexes } = this.state

      if (activeIndexes.has(index)) {
        activeIndexes.delete(index)
      } else {
        activeIndexes.add(index)
      }

      this.setState({ activeIndexes })
    }

    startLoader = () => {
      this.setState({loading: true})
    }

    handleFilterDelete = (item) => {
      console.log('Inside delete', item)
      this.startLoader()
      const { type, name, value } = item
      const CLEAR = 'clear'
      switch (type) {
        case filterTypes.Alphabetic:
          this.updateAlphabetsFilters(name, value)
          break

        case filterTypes.Numeric:
          this.updateNumericFilters(name)
          break

        case CLEAR:
          this.clearAllFilters()
          break

        default:
          break
      }
      this.selectedGraphLesson = ''
      this.selectedGraphModule = ''
      this.updateState()
    }

    handleTryAgain= () => {
      console.log(this)
      this.updateState()
    }

    render () {
      const { loading, errorScreen } = this.state

      return (
        <React.Fragment>
          <Dimmer active={errorScreen} page>
            <Header as='h2' icon inverted>
              <Icon name='warning circle' />
                Oops! something went wrong.
              <Divider />
              <Button onClick={() => { this.handleTryAgain() }}>
                Try Again
              </Button>
            </Header>
          </Dimmer>
          <Grid padded textAlign='center'>
            <Dimmer active={loading} inverted>
              <Loader size='massive'>Loading</Loader>
            </Dimmer>
          </Grid>
          <WrappedComponent
            {...this.props}
            {...this.state}
            onChange={this.handleFilterChange}
            onClick={this.handleFilterDelete}
            onMenuChange={this.onMenuChange}
            onGraphClick={this.handleGraphClick}
            onOptionClick={this.handleOptionsClick}
          />
        </React.Fragment>

      )
    }
  })
}

export default dashboardHOC
// export default connect(mapStateToProps)(dashboardHOC)

