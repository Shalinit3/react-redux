/**
  * Renders modal with two datepicker compoents and a menu-item container. On submit, it calls
  * prop onSubmit of parent
  */

import React, { Component } from 'react'
import { Form, Grid, Segment, Input } from 'semantic-ui-react'

import PropTypes from 'prop-types'

import Modal from './Modal'

import MenuContainer from '../components/MenuContainer'
import { alphabets } from '../utils/generators'
import { chunk, categorize } from '../utils/arrays'

import { scrollToViewSettings } from '../config/settings'

const propTypes = {
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired
    })
  ).isRequired,
  selected: PropTypes.instanceOf(Set).isRequired
}

const defaultProps = {
  open: false
}

class ModalAlphabeticFilter extends Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(
      {
        search: ''
      },
      this.getItems(props)
    )
  }

  componentWillReceiveProps (nextProps) {
    // Update the selected to original selections
    this.setState(this.getItems(nextProps))
  }

  handleSubmit = () => {
    let { selected } = this.state

    this.props.onSubmit([...selected])
  }

  handleAlphabetsClick = (data) => {
    this.refs[data.value].scrollIntoView(scrollToViewSettings)
  }

  handleSearchChange = (e) => {
    let value = e.target.value.toUpperCase()
    let { items } = this.props
    let { selected } = this.state

    let filteredItems = items.filter(item => {
      let upperLabel = item.label.toUpperCase()
      return upperLabel.includes(value)
    })

    // Sending the filtered items and selected elements
    this.setState(this.getItems({
      items: filteredItems,
      selected
    }))
  }

  handleCheckboxClick = (e, props) => {
    let { selected } = this.state
    let { value } = props

    if (selected.has(value)) {
      selected.delete(value)
    } else {
      selected.add(value)
    }

    this.setState({
      selected
    })
  }

  getItems ({items, selected}) {
    let response = categorize(items, 'label')

    return {
      selected: new Set([...selected]), // Coping Selected so that it will not affect the passed props object
      alphabets: alphabets().map(alphabet => {
        return Object.assign({}, alphabet, {
          disabled: response.characters.indexOf(alphabet.content) < 0
        })
      }), // Available Characters
      partitions: chunk(response.results) // Result containing the label as array elements itself.
    }
  }

  renderPartition = (partition) => {
    let { selected } = this.state
    return partition.map(item => {
      return (item.type && item.type === 'alpha')
        ? <strong ref={item.label} className='label' key={item.label} > {item.label} </strong>
        : (
          <Form.Checkbox
            onClick={this.handleCheckboxClick}
            key={item.label}
            label={item.label}
            value={item.value}
            checked={selected.has(item.value)}
            style={{overflow: 'hidden', width: '100%'}}
          />
        )
    })
  }

  renderPartitions = () => {
    let { partitions } = this.state
    return partitions.map((partition, i) => {
      return (
        <div className='partition' key={i}>
          {
            this.renderPartition(partition)
          }
        </div>
      )
    })
  }

  getHeader = () => {
    let { alphabets: alphabetList, value } = this.state
    let { label } = this.props

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} className='title' >
            {label}
          </Grid.Column>
          <Grid.Column width={4} >
            <Input
              value={value}
              icon='search'
              placeholder='Search'
              size='mini'
              fluid
              onChange={this.handleSearchChange}
            />
          </Grid.Column>
          <Grid.Column width={8} textAlign='right' >
            <MenuContainer
              onClick={this.handleAlphabetsClick}
              floated='right'
              fluid={false}
              text
              items={alphabetList}
              vertical={false}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  render () {
    const { items, selected, onSubmit, ...rest } = this.props

    return (
      <Modal
        header={this.getHeader()}
        onSubmit={this.handleSubmit}
        {...rest}
      >
        <Segment basic className='alphabetical'>
          {this.renderPartitions()}
        </Segment>
      </Modal>
    )
  }
}

ModalAlphabeticFilter.propTypes = propTypes
ModalAlphabeticFilter.defaultProps = defaultProps

export default ModalAlphabeticFilter
