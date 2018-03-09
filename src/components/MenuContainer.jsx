import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import MenuItem from './MenuItem'

const propTypes = {
  active: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  fluid: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      data: PropTypes.shape({
        value: PropTypes.string.isRequired
      })
    })
  ).isRequired,
  vertical: PropTypes.bool,
  pointing: PropTypes.bool
}

const defaultProps = {
  active: null,
  color: 'teal',
  fluid: true,
  vertical: true,
  pointing: true
}

class MenuContainer extends Component {
  handleOnClick = (data) => {
    this.props.onClick(data)
  }

  renderItem = (item) => {
    const { data: { value } } = item
    const { active } = this.props

    return (
      <MenuItem
        key={value}
        active={active === value}
        onClick={this.handleOnClick}
        {...item}
      />
    )
  }

  renderItems = () => {
    const { items } = this.props

    return items.map(item => this.renderItem(item))
  }

  render () {
    const { active, onClick, items, ...rest } = this.props

    return (
      <Menu {...rest} >
        {this.renderItems()}
      </Menu>
    )
  }
}

MenuContainer.propTypes = propTypes
MenuContainer.defaultProps = defaultProps

export default MenuContainer
