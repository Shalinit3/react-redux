import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'semantic-ui-react'

import RadioGroup from '../RadioGroup'
import CustomRange from './components/CustomRange'

import { timeRange } from '../../utils/generators'
import { numberFormat } from '../../utils/formatters'

const propTypes = {
  minRecords: PropTypes.number,
  optionCount: PropTypes.number,
  content: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  selected: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  onChange: PropTypes.func
}

const defaultProps = {
  optionCount: 4, // Number of options required except Below and Above
  content: [],
  valueKey: '', // The key from data for which the Numeric Filter is to be generated
  minRecords: 5 // Minimum number of records to be there in each range
}

class NumericFilter extends Component {
  constructor (props) {
    super(props)

    const { selected, content } = props
    const data = this.getContent(selected.min, selected.max, content)

    const { min, max, options, active } = data

    this.state = {
      min,
      max,
      options,
      active
    }
  }

  componentWillReceiveProps (nextProps) {
    const { selected, content } = nextProps
    const data = this.getContent(selected.min, selected.max, content)
    const { min, max, options, active } = data

    this.setState({
      min,
      max,
      options,
      active
    })
  }

  handleChange = (data) => {
    const { value } = data
    const { onChange, content } = this.props

    const newData = this.getContent(value.min, value.max, content)
    const { min, max, options, active } = newData

    this.setState({
      options,
      active,
      min,
      max
    })

    onChange(value)
  }

  getContent = (min, max, content) => {
    const { optionCount, valueKey, minRecords } = this.props
    const data = timeRange(content, valueKey, optionCount, minRecords) // Function returns an array of options and min & max for the data
    let active = false

    const options = data.content.map((item) => {
      const { value, ...rest } = item
      const checked = (value.min === min && value.max === max)
      if (checked) {
        active = true
      }
      return { ...rest, value, checked }
    })

    return { options, min: data.min, max: data.max, active: active }
  }

  render () {
    const { min, max, options, active } = this.state
    const { selected } = this.props

    return (
      <div>
        <RadioGroup
          name={'avgTime'}
          options={options}
          active={active}
          onChange={this.handleChange}
        />
        <Divider hidden />
        <CustomRange
          onChange={this.handleChange}
          min={numberFormat(min)}
          max={numberFormat(max)}
          selectedMin={selected.min}
          selectedMax={selected.max}
          active={!active}
        />
      </div>
    )
  }
}

NumericFilter.propTypes = propTypes
NumericFilter.defaultProps = defaultProps

export default NumericFilter
