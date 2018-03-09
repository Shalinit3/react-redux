import React from 'react'
import { Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  data: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired
}

const defaultProps = {
  data: [],
  keys: []
}

const TableBody = (props) => {
  const getCells = (index) => {
    const {data, keys} = props
    return keys.map((value) => {
      return (
        <Table.Cell key={`${index}${value}`}>
          { data[index][value] }
        </Table.Cell>
      )
    })
  }

  const getRows = () => {
    const {data} = props
    return data.map((value, index) => {
      return (
        <Table.Row key={`${index}${JSON.stringify(value)}`} onClick={() => { props.onClick(value) }}>
          { getCells(index) }
        </Table.Row>
      )
    })
  }

  return (
    <Table.Body>
      { getRows() }
    </Table.Body>
  )
}

TableBody.propTypes = propTypes
TableBody.defaultProps = defaultProps

export default TableBody
