import React, { PureComponent } from 'react'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Pagination from 'semantic-ui-react-button-pagination'

const propTypes = {
  onChange: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

const defaultProps = {
  offset: 0,
  limit: 10,
  total: 100
}

class TableFooter extends PureComponent {
  handleClick = (value) => {
    this.props.onChange(value)
  }

  render () {
    const { pageSize, total, offset } = this.props

    return (
      <Menu floated='right' className={'foot'} >
        <Pagination
          offset={offset}
          limit={pageSize}
          total={total}
          reduced
          fluid
          basic
          compact
          size={'tiny'}
          style={{ border: 'none !important', width: '100% !important' }}
          onClick={(e, props, offset) => this.handleClick(offset)}
        />
      </Menu>
    )
  }
}

TableFooter.defaultProps = defaultProps
TableFooter.propTypes = propTypes

export default TableFooter
