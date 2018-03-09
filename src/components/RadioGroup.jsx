import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func
}

class RadioGroup extends Component {
  renderRadioInput = ({ label, value, checked }) => {
    const { name, onChange } = this.props
    return (
      <Form.Field key={label} >
        <Radio
          label={label}
          name={name}
          checked={checked}
          onChange={() => onChange({value})}
        />
      </Form.Field>
    )
  }

  renderRadioGroup = () => {
    const { options } = this.props

    if (!options || !options.length) {
      return null
    }

    return options.map((option) => {
      return this.renderRadioInput(option)
    })
  }

  render () {
    return (
      <Form>
        {this.renderRadioGroup()}
      </Form>
    )
  }
}

RadioGroup.propTypes = propTypes

export default RadioGroup
