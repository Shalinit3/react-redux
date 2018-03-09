import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired
}

const defaultProps = {
  columns: []
}

class TableHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sort: null,
      sortedKey: null
    }
  }

  handleSorting = (key) => {
    let { sort, sortedKey } = this.state

    if (sort === null || sortedKey !== key) {
      sort = 'asc'
      sortedKey = key
    } else if (sort === 'asc') {
      sort = 'desc'
    } else {
      sort = null
      sortedKey = null
    }

    this.setState({ sort, sortedKey })
    this.props.onClick(sortedKey, sort)
  }

  getColumnHeaders = () => {
    const { columns } = this.props
    const { sort, sortedKey } = this.state
    return columns.map((value) => {
      return (
        <Table.HeaderCell
          value={value.key}
          key={value.key}
          onClick={() => this.handleSorting(value.key)}
        >
          {value.label}

          {
            sortedKey === value.key && sort
              ? <Icon className={'right'} name={'sort content ' + sort + 'ending'} />
              : null
          }

        </Table.HeaderCell>
      )
    })
  }

  render () {
    return (
      <Table.Header>
        <Table.Row>
          {this.getColumnHeaders()}
        </Table.Row>
      </Table.Header>
    )
  }
}

TableHeader.defaultProps = defaultProps
TableHeader.propTypes = propTypes

export default TableHeader
