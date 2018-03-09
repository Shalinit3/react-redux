/**
  * Inline Datepicker component to render which takes startDate, endDate and selected from props
  * For reference: https://hacker0x01.github.io/react-datepicker/
  */

import React, { Component } from 'react'
import InlineDatePicker from './InlineDatePicker/index'

class InlineDateRangePicker extends Component {
  render () {
    return <InlineDatePicker monthsShown={2} {...this.props} />
  }
}

export default InlineDateRangePicker
