/**
  * Renders modal with two datepicker compoents and a menu-item container.
  * On submit - it calls onSubmit prop of parent
  * On Close - it calls onClose prop of parent
  */

import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Modal from './Modal'
import InlineDateRangePicker from './InlineDateRangePicker'
import MenuContainer from './MenuContainer'

import { dateTypes, dateOptions } from '../utils/configurations/dateOptions'

const propTypes = {
  open: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

  type: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object
}

const defaultProps = {
  open: false,

  type: dateTypes.TODAY,
  startDate: moment(),
  endDate: moment()
}

class ModalDatePickerFilter extends Component {
  constructor (props) {
    super(props)

    const { startDate, endDate, type } = this.props

    this.state = this.getCustomState({
      startDate,
      endDate,
      type
    })
  }

  componentWillReceiveProps (nextProps) {
    const { startDate, endDate, type } = nextProps

    this.setState(this.getCustomState({
      startDate,
      endDate,
      type
    }))
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  handleMenuClick = ({startDate, endDate, value: type}) => {
    let state = this.getCustomState({
      startDate,
      endDate,
      type
    })

    this.setState(
      state
    )
  }

  handleDateChange = (date) => {
    if (this.state.type !== dateTypes.CUSTOM) {
      return false
    }

    const { endDate, startDate } = this.state

    let dataToUpdate = {}

    /**
     * If (enddate and start date are already set)
     * or (selected date is smaller then current selected start date)
     * then reset to start date
     */
    if ((endDate && startDate) || (!endDate && date < startDate)) {
      dataToUpdate = {
        startDate: date,
        endDate: null,
        selectsEnd: true
      }
    } else {
      dataToUpdate = {
        endDate: date,
        selectsEnd: false
      }
    }

    this.setState(dataToUpdate)
  }

  getCustomState = ({startDate, endDate, type}) => {
    /**
     * Mindate and maxdate are used to restrict the dates
     */

    let minDate = startDate
    let maxDate = endDate
    let selectsEnd = false

    // If date is custom, then allow user to select any date upto today's date.
    if (type === dateTypes.CUSTOM) {
      minDate = null
      maxDate = moment()
    }

    return {
      startDate,
      endDate,
      type,
      minDate,
      maxDate,
      selectsEnd
    }
  }

  getContent = () => {
    const { startDate, endDate, type, minDate, maxDate, selectsEnd } = this.state

    return (
      <Grid divided >
        <Grid.Row>
          <Grid.Column width={6}>
            <MenuContainer
              active={type}
              onClick={this.handleMenuClick}
              items={dateOptions}
            />
          </Grid.Column>
          <Grid.Column width={10} textAlign='center'>
            <InlineDateRangePicker
              selectedDate={startDate}
              startDate={startDate}
              endDate={endDate || startDate}
              onChange={this.handleDateChange}
              selectsEnd={selectsEnd}
              maxDate={maxDate}
              minDate={minDate}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  render () {
    const { startDate, endDate, type, onSubmit, ...rest } = this.props

    return (
      <Modal
        header={'Date Range'}
        onSubmit={this.handleSubmit}
        {...rest}
      >
        {this.getContent()}
      </Modal>
    )
  }
}

ModalDatePickerFilter.propTypes = propTypes
ModalDatePickerFilter.defaultProps = defaultProps

export default ModalDatePickerFilter
