import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './style.css'
import { getColumnData } from '../../utils/generators/'
import TableFooter from './components/TableFooter'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'
import NoData from '../NoData'
import { compare } from '../../utils/arrays'

const propTypes = {
  pageSize: PropTypes.number,
  pagination: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string
    })
  ),
  data: PropTypes.array.isRequired
}

const defaultProps = {
  columns: [],
  pageSize: 5,
  pagination: false
}

class TabularForm extends Component {
  constructor (props) {
    super(props)

    const columns = this.getDefaultColumns(props.data)
    const { pagination, pageSize, data } = props
    let pages = 0
    let filteredData = data
    const total = data.length

    if (pagination) {
      pages = Math.ceil(data.length / pageSize)
      filteredData = data.slice(0, pageSize)
    }

    this.state = {
      columns,
      total,
      pages,
      data,
      filteredData,
      offset: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    let { data, columns, pagination, pageSize } = nextProps
    let pages = 0
    let filteredData = data
    const total = data.length

    if (pagination) {
      pages = Math.ceil(data.length / pageSize)
      filteredData = data.slice(0, pageSize)
    }

    this.getDefaultColumns(data)
    this.setState({
      data,
      columns,
      total,
      pages,
      filteredData,
      offset: 0
    })
  }

  getDefaultColumns = (data) => {
    const { columns } = this.props
    if (columns.length) {
      return columns
    }

    return getColumnData(data)
  }

  columnLabels = () => {
    const { columns } = this.state

    return columns.map((value) => {
      return value.label
    })
  }

  columnKeys = () => {
    const { columns } = this.state

    return columns.map((value) => {
      return value.key
    })
  }

  changeSelectedPage = (newIndex) => {
    const { data } = this.state
    const { pageSize } = this.props
    const newData = data.slice(newIndex, (newIndex + pageSize))

    this.setState({
      filteredData: newData,
      offset: newIndex
    })
  }

  handleSorting = (key, order) => {
    const { data, pageSize, pagination } = this.props
    let { filteredData } = this.state
    let sortedData = [...data]

    if (order) {
      sortedData.sort(compare(key, order))
    }

    if (pagination) {
      filteredData = sortedData.slice(0, pageSize)
    }

    this.setState({
      offset: 0,
      data: sortedData,
      filteredData
    })
  }

  handleRowClick = (data) => {
    this.props.onClick(data)
  }

  render () {
    const { offset, pages, columns, filteredData, data, total } = this.state
    const { pageSize, pagination } = this.props

    if (!this.props.data.length) {
      return (
        <NoData text='No matching record found for the filters.' />
      )
    }

    return (
      <div>
        <div className={'cont'} id={'style-1'}>
          <Table celled sortable size={'small'} unstackable className={'width'}>
            <TableHeader
              columns={columns}
              onClick={this.handleSorting}
            />
            <TableBody
              data={pagination ? filteredData : data}
              keys={this.columnKeys()}
              onClick={this.handleRowClick}
            />

          </Table>
        </div>
        { pagination
          ? <TableFooter
            offset={offset}
            total={total}
            pageSize={pageSize}
            pageCount={pages}
            onChange={this.changeSelectedPage}
          />
          : null }
      </div>
    )
  }
}

TabularForm.defaultProps = defaultProps
TabularForm.propTypes = propTypes

export default TabularForm
