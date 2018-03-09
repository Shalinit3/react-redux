/**
  * Renders modal with two datepicker compoents and a menu-item container. On submit, it calls
  * prop onSubmit of parent
  */

import React, { Component } from 'react'
import { Divider, Form } from 'semantic-ui-react'
import partition from 'lodash/partition'

import PropTypes from 'prop-types'

import ModalAlphabeticFilter from './ModalAlphabeticFilter'
import modalHOC from '../HOC/modalHOC'
import { clone, compare } from '../utils/arrays'

const propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired
    })
  ).isRequired,
  selected: PropTypes.instanceOf(Set).isRequired,
  onSubmit: PropTypes.func.isRequired
}

class AlphabeticFilter extends Component {
  constructor (props) {
    super(props)
    this.state = this.getItems(props)
  }

  componentWillReceiveProps (nextProps) {
    // Update the selected to original selections
    this.setState(this.getItems(nextProps))
  }

  handleCheckboxClick = (e, props) => {
    let { selected } = this.state
    let { value } = props

    const { onSubmit, name } = this.props

    if (selected.has(value)) {
      selected.delete(value)
    } else {
      selected.add(value)
    }

    onSubmit([...selected], name)
  }

  getItems = ({items, selected}) => {
    // let response = categorize(items, 'label')
    let [selectedItems, unselectedItems] = partition(clone(items), (item) => {
      return selected.has(item.value)
    })

    selectedItems.sort(compare('label'))
    unselectedItems.sort(compare('label'))

    console.log([...selectedItems, ...unselectedItems])

    return {
      selected: new Set([...selected]), // Coping Selected so that it will not affect the passed props object
      partialItems: [...selectedItems, ...unselectedItems].slice(0, 5) // Result containing the label as array elements itself.
    }
    // return {}
  }

  render () {
    let { label, onSubmit, open, onClose, onOpen, items } = this.props
    let { selected, partialItems } = this.state

    return (
      <div>
        <Divider hidden />
        <Form>
          <Form.Group grouped>
            <Form.Input icon='search' placeholder='Search' value='' onChange={onOpen} />

            {
              partialItems.map(item => {
                return (
                  <Form.Checkbox
                    onClick={this.handleCheckboxClick}
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    checked={selected.has(item.value)}
                  />
                )
              })
            }

            <label className='more' onClick={onOpen} >More</label>

            <ModalAlphabeticFilter
              label={label}
              items={items}
              selected={selected}
              open={open}
              onClose={onClose}
              onSubmit={onSubmit}
            />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

AlphabeticFilter.propTypes = propTypes

export default modalHOC(AlphabeticFilter)
