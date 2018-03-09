/**
  * Sematic Menu item Component or Link to render the provided element and sent provided `data` back
  */

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  active: PropTypes.bool,
  content: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

const defaultProps = {
  active: false
}

class MenuItem extends Component {
  handleOnClick = () => {
    const { onClick, data } = this.props
    onClick(data)
  }

  render () {
    const { onClick, data, ...rest } = this.props

    return (
      <Menu.Item
        onClick={this.handleOnClick}
        {...rest}
      />
    )
  }
}

MenuItem.propTypes = propTypes
MenuItem.defaultProps = defaultProps

export default MenuItem
