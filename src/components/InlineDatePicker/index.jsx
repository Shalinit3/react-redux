/**
  * Inline Datepicker component to render which takes startDate, endDate and selected from props
  * For reference: https://hacker0x01.github.io/react-datepicker/
  */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import './style.css'

const propType = {
  selected: PropTypes.object,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

const defaultProps = {
  selected: moment(),
  startDate: moment(),
  endDate: moment()
}

class InlineDatePicker extends Component {
  render () {
    return <DatePicker inline {...this.props} />
  }
}

InlineDatePicker.propType = propType
InlineDatePicker.defaultProps = defaultProps

export default InlineDatePicker
