import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Label } from 'semantic-ui-react'

import InputField from '../../Input/NumericField'
import { numberFormat } from '../../../utils/formatters'

const propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  selectedMax: PropTypes.any,
  selectedMin: PropTypes.any,
  onChange: PropTypes.func,
  active: PropTypes.bool
}

const defaultProps = {
  selectedMax: '',
  selectedMin: ''
}

class CustomRange extends Component {
  constructor (props) {
    super(props)

    let { min: currentMin, max: currentMax } = props
    const { selectedMax, selectedMin } = props

    if (selectedMax && selectedMax) {
      currentMin = selectedMin
      currentMax = selectedMax
    }

    this.state = {
      currentMin,
      currentMax
    }
  }

  componentWillReceiveProps (nextProps) {
    let { min: currentMin, max: currentMax, active, selectedMax, selectedMin } = nextProps

    if (selectedMax && selectedMax) {
      currentMin = selectedMin
      currentMax = selectedMax
    }

    // If custom range is not active
    if (!active) {
      this.setState({
        currentMin,
        currentMax
      })
    }
  }

  handleOnClick = () => {
    let currentMin = numberFormat(this.props.min)
    let currentMax = numberFormat(this.props.max)
    const minField = numberFormat(this.minField.state.value)
    const maxField = numberFormat(this.maxField.state.value)

    if (currentMin <= minField && minField < currentMax) {
      currentMin = minField
    }
    if (currentMax >= maxField && currentMin <= maxField) {
      currentMax = maxField
    }

    this.setState({
      currentMin,
      currentMax
    })

    this.props.onChange({
      value: { min: currentMin, max: currentMax }
    })
  }

  render () {
    const { currentMin, currentMax } = this.state
    return (
      <Form>
        <Form.Group>
          <InputField
            name='min'
            type='number'
            placeholder='From'
            width={5}
            value={currentMin}
            ref={(input) => { this.minField = input }}
          />
          <Label basic size='large'>-</Label>
          <InputField
            name='max'
            type='number'
            placeholder='To'
            width={5}
            value={currentMax}
            ref={(input) => { this.maxField = input }}
          />
          <Button
            content='GO'
            width={3}
            color='teal'
            size='mini'
            onClick={this.handleOnClick}
          />
        </Form.Group>
      </Form>
    )
  }
}

CustomRange.propTypes = propTypes
CustomRange.defaultProps = defaultProps

export default CustomRange
