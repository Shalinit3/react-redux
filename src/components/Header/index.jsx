/**
 * Master Header component will be used throught out the pages.
 */

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import logo from '../../images/logo.svg'

class Header extends Component {
  render () {
    let {visibility: { topVisible = true } = {}} = this.props

    return (
      <Menu className={topVisible ? 'visible' : ''} borderless size='massive' fixed='top'>
        <Menu.Item as='a' header>
          <img src={logo} alt='Robokind' />
        </Menu.Item>

        <Menu.Item
          name='sign-in'
          position='right'
        >
            Sign-in
        </Menu.Item>
      </Menu>
    )
  }
}

export default Header
