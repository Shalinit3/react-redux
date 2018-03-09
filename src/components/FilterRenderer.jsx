import React, { Component } from 'react'
import { Label, Icon, Grid } from 'semantic-ui-react'

const defaultProps = {
  clearLabelColor: 'teal',
  labelColor: 'orange',
  defaultLabelText: 'Filtered By:',
  clearLabelText: 'Clear All',
  showDefaultLabel: true,
  showClearLabel: true
}

const propTypes = {

}

class FilterRenderer extends Component {
  renderLabels = () => {
    const { filterData } = this.props

    return filterData.map((item) => {
      return (
        <Label key={`${item.key}${item.value}`} as='a' color='orange' className={'bottomMargin'}>
          {item.label}
          <Icon name='delete' onClick={() => this.props.onChange(item)} />
        </Label>
      )
    })
  }

  renderDefaultLabel = () => {
    const { showDefaultLabel, defaultLabelText } = this.props

    if (!showDefaultLabel) {
      return null
    }

    return (
      <label >
        {defaultLabelText}
      </label>
    )
  }

  renderClearLabel = () => {
    const { showClearLabel, clearLabelText, clearLabelColor, onChange } = this.props

    if (!showClearLabel) {
      return null
    }

    return (
      <Label as='a' color={clearLabelColor} onClick={() => onChange({ type: 'clear' })} >
        {clearLabelText}
      </Label>
    )
  }

  render () {
    const { filterData } = this.props

    if (!filterData || !filterData.length) {
      return null
    }

    return (
      <React.Fragment>
        <Grid.Column computer={2} tablet={3} mobile={4} >
          {this.renderDefaultLabel()}
        </Grid.Column>
        <Grid.Column computer={11} tablet={12} mobile={12}>
          {this.renderLabels()}
          {this.renderClearLabel()}
        </Grid.Column>
      </React.Fragment>

    )
  }
}

FilterRenderer.defaultProps = defaultProps
FilterRenderer.propTypes = propTypes

export default FilterRenderer
