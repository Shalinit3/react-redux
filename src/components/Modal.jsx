/**
  * Sematic modal component. It can render sumbit, cancel, reset actions conditionally via props and takes
  * modal.content as children prop (required)
  */

import React, { Component } from 'react'
import { Button, Modal as SematicModal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  open: PropTypes.bool,
  header: PropTypes.node.isRequired,
  children: PropTypes.element.isRequired,

  closeText: PropTypes.string,
  resetText: PropTypes.string,
  submitText: PropTypes.string,

  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func

}

const defaultProps = {
  open: false,
  closeText: 'Cancel',
  resetText: 'Reset',
  submitText: 'Apply',
  onReset: null,
  onSubmit: null
}

class Modal extends Component {
  renderAction = (props) => {
    let { onClick } = props
    return onClick && <Button {...props} />
  }

  render () {
    const {
      open,
      header,
      children,
      resetText,
      closeText,
      submitText,
      onClose,
      onSubmit,
      onReset
    } = this.props
    return (
      <SematicModal
        open={open}
        onClose={onClose}
        closeIcon>
        <SematicModal.Header>
          {header}
        </SematicModal.Header>
        <SematicModal.Content>
          <SematicModal.Description>
            {children}
          </SematicModal.Description>
        </SematicModal.Content>
        <SematicModal.Actions>
          {this.renderAction({ className: 'clear-selection', onClick: onReset, content: resetText })}
          {this.renderAction({ onClick: onClose, content: closeText })}
          {this.renderAction({ onClick: onSubmit, content: submitText, primary: true })}
        </SematicModal.Actions>
      </SematicModal>
    )
  }
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal
