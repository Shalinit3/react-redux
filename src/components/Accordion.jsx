import React, { Component } from 'react'
import { Accordion, Menu, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import DatePickerFilter from '../components/DatePickerFilter'
import AlphabeticFilter from '../components/AlphabeticFilter'
import NumericFilter from '../components/NumericFilter'

import { filterTypes } from '../utils/configurations/filtersConfig'

const propTypes = {
  menuitems: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.arrayOf(PropTypes.number),
  startDate: PropTypes.object
}

const defaultProps = {
  active: [],
  as: Menu,
  vertical: true,
  exclusive: false,
  fluid: true
}

class AccordionComponent extends Component {
  getFilter = (item) => {
    const { type, title, name } = item
    const filterName = `selected${name.charAt(0).toUpperCase()}${name.slice(1)}`

    switch (type) {
      case filterTypes.Date :
        return (
          <DatePickerFilter
            name={name}
            startDate={this.props[filterName].startDate}
            endDate={this.props[filterName].endDate}
            type={this.props[filterName].type}
            onSubmit={(data) => this.props.onChange(data, name, type)}
          />
        )
      case filterTypes.Numeric :
        return (
          <NumericFilter
            name={name}
            content={this.props[name]}
            selected={this.props[filterName]}
            valueKey={'value'}
            onChange={(data) => this.props.onChange(data, name, type)}
          />
        )
      case filterTypes.Alphabetic :
        return (
          <AlphabeticFilter
            name={name}
            items={this.props[name]}
            selected={this.props[filterName]}
            onSubmit={(data) => this.props.onChange(data, name, type)}
            label={title}
          />
        )
      default : return null
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    this.props.onMenuChange(index)
  }

  renderMenu = () => {
    const { activeIndexes } = this.props
    const { config } = this.props

    return config.filters.map((item, index) => {
      return (
        <Menu.Item key={index}>
          <Accordion.Title
            active={activeIndexes.has(index)}
            content={<b>{item.title}</b>}
            index={index}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndexes.has(index)} >
            <Divider hidden />
            {this.getFilter(item)}
          </Accordion.Content>
        </Menu.Item>
      )
    })
  }

  render () {
    const { as, vertical, exclusive, fluid } = this.props
    return (
      <Accordion as={as} vertical={vertical} exclusive={exclusive} fluid={fluid} >
        {this.renderMenu()}
      </Accordion>

    )
  }
}

AccordionComponent.propTypes = propTypes
AccordionComponent.defaultProps = defaultProps

export default AccordionComponent
