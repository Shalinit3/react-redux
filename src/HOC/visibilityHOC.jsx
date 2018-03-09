/**
 * Component will send the visibility behaviour props to the WrapedComponent
 * Will be useful to detect the position of the element in browser
 */

import React, { Component } from 'react'
import { Visibility as SemanticVisibility } from 'semantic-ui-react'

const visibilityHOC = (WrappedComponent) => {
  return class VisibilityHOC extends Component {
    constructor (props) {
      super(props)

      this.state = {
        visibility: {}
      }

      this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate (e, { calculations }) {
      this.setState({
        visibility: calculations
      })
    }

    render () {
      return (
        <SemanticVisibility onUpdate={this.handleUpdate}>
          <WrappedComponent {...this.props} {...this.state} />
        </SemanticVisibility>
      )
    }
  }
}

export default visibilityHOC
