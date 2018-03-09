/**
 * Component will send the visibility behaviour props to the WrapedComponent
 * Will be useful to detect the position of the element in browser
 */

import React, { Component } from 'react'
import { ResponsiveContainer } from 'recharts'

class Responsive extends Component {
  render () {
    let { aspect, width, children } = this.props
    return (
      <ResponsiveContainer width={width || '100%'} aspect={aspect || 1.5} >
        {children}
      </ResponsiveContainer>
    )
  }
}

export default Responsive
