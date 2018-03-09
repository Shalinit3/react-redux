import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string.isRequired
}

const defaultProps = {
  value: ''
}

class NumericField extends Component {
  constructor (props) {
    super(props)

    const { value } = props
    this.state = { value }
  }

  componentWillReceiveProps (nextProps) {
    const { value } = nextProps

    this.setState({ value })
  }

    handleOnChange = (e) => {
      const { type } = this.props
      let value = e.target.value
      let valid = true

      if (type === 'number') {
        valid = !isNaN(value)
      }

      if (valid) {
        this.setState({
          value
        })
      }
    }

    render () {
      const { placeholder, width, name } = this.props
      const { value } = this.state
      return (
        <Form.Input
          placeholder={placeholder}
          width={width}
          onChange={this.handleOnChange}
          name={name}
          value={value || ''}
        />
      )
    }
}

NumericField.defaultProps = defaultProps
NumericField.propTypes = propTypes

export default NumericField
