/**
  * Renders modal with two datepicker compoents and a menu-item container. On submit, it calls
  * prop onSubmit of parent
  */

import React, { Component } from 'react'
import { Label, Icon, Grid, Divider } from 'semantic-ui-react'

import PropTypes from 'prop-types'

import ModalDatePickerFilter from './ModalDatePickerFilter'
import modalHOC from '../HOC/modalHOC'

import { dateFormat } from '../utils/formatters'

const propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class DatePickerFilter extends Component {
  render () {
    let { startDate, endDate, type, onSubmit, open, onClose, onOpen } = this.props

    return (
      <div>
        <Divider hidden />
        <Grid >
          <Grid.Column width={13}>
            <Label>{dateFormat(startDate)}</Label> - <Label>{dateFormat(endDate)}</Label>
          </Grid.Column>
          <Grid.Column width={2} >
            <Icon color='teal' name='pencil' size='large' onClick={onOpen} />
          </Grid.Column>
        </Grid>

        <ModalDatePickerFilter
          type={type}
          startDate={startDate}
          endDate={endDate}
          open={open}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </div>
    )
  }
}

DatePickerFilter.propTypes = propTypes

export default modalHOC(DatePickerFilter)
