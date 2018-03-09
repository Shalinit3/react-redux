import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { BarChart, Bar, Cell, LabelList, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import Responsive from './components/Responsive'
import { chartColors, barConfig } from '../../config/settings'
import { truncate } from '../../utils/formatters'

const propTypes = {
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  showTooltip: PropTypes.bool,
  showXAxis: PropTypes.bool,
  showYAxis: PropTypes.bool,
  showGrid: PropTypes.bool,
  data: PropTypes.array.isRequired,
  active: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

const defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  showTooltip: true,
  showXAxis: true,
  showYAxis: true,
  showGrid: true
}

class BarGraph extends Component {
  handleOnClick = (data, index) => {
    this.props.onClick(data.data)
  }

  trucateLabel = ({value, size = barConfig.LABEL_TRUNCATE}) => {
    return truncate({
      value,
      size
    })
  }

  renderTooltip () {
    let { showTooltip } = this.props

    return showTooltip ? <Tooltip /> : null
  }

  renderXAxis () {
    let { showXAxis, labelKey } = this.props

    return showXAxis ? <XAxis dataKey={labelKey} tick={false} /> : null
  }

  renderYAxis () {
    let { showYAxis } = this.props

    return showYAxis ? <YAxis /> : null
  }

  renderGrid () {
    let { showGrid } = this.props

    return showGrid ? <CartesianGrid strokeDasharray='3 3' /> : null
  }

  render () {
    const { data, active, labelKey, valueKey } = this.props

    return (
      <Responsive>
        <BarChart data={data}>
          {this.renderTooltip()}
          {this.renderXAxis()}
          {this.renderYAxis()}
          {this.renderGrid()}

          <Bar dataKey={valueKey} onClick={this.handleOnClick}>
            {
              data.map((entry, index) => (
                <Cell
                  key={`cell-${entry[labelKey]}`}
                  data={entry}
                  cursor='pointer'
                  fill={entry[labelKey] === active ? chartColors.SELECTED : chartColors.PRIMARY}
                />
              ))
            }

            <LabelList
              dataKey={labelKey}
              position='bottom'
              angle={-40}
              style={{fontSize: barConfig.LABEL_FONTSIZE}}
              content={this.trucateLabel}
            />
          </Bar>
        </BarChart>
      </Responsive>
    )
  }
}

BarGraph.propTypes = propTypes
BarGraph.defaultProps = defaultProps

export default BarGraph
