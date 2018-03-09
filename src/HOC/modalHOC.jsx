/**
 * Component will add Modal onClose, onOpen event to the passed componet
 * and will override the passed onSubmit props as well
 */

import React, { Component } from 'react'

const modalHOC = (WrappedComponent) => {
  return class ModalHOC extends Component {
    constructor (props) {
      super(props)

      this.state = {
        open: false
      }
    }

    handleOnSubmit = (data) => {
      this.setState({
        open: false
      })

      this.props.onSubmit(data)
    }

    handleOnOpen = () => {
      this.setState({
        open: true
      })
    }

    handleOnClose = () => {
      this.setState({
        open: false
      })
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onOpen={this.handleOnOpen}
          onClose={this.handleOnClose}
          onSubmit={this.handleOnSubmit}
        />
      )
    }
  }
}

export default modalHOC
