import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Sector, PieChart, Pie, Cell, Tooltip} from 'recharts'

import Responsive from './components/Responsive'
import NoData from '../NoData'

import { chartColors, pieConfig, mathConfig } from '../../config/settings'
import { truncate } from '../../utils/formatters'

const propTypes = {
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  showTooltip: PropTypes.bool,
  data: PropTypes.array.isRequired,
  active: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

const defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  showTooltip: true
}

class PieGraph extends Component {
  handleOnClick = (data) => {
    this.props.onClick(data)
  }

  getCustomizedLabel = (props) => {
    const { cx, cy, midAngle, outerRadius, startAngle, endAngle, fill, percent, label } = props

    const { active } = this.props

    let isActive = label === active
    let fillActive = isActive ? chartColors.SELECTED : fill

    const sin = Math.sin(-mathConfig.RADIAN * midAngle)
    const cos = Math.cos(-mathConfig.RADIAN * midAngle)

    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my

    const textAnchor = cos >= 0 ? 'start' : 'end'

    let display = (Math.abs(startAngle - endAngle) < 9) ? 'none' : 'block'

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fillActive}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fillActive} fill='none' display={display} />
        <circle cx={ex} cy={ey} r={2} fill={fillActive} stroke='none' display={display} />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={chartColors.TEXT} fontSize={pieConfig.LABEL_FONTSIZE} display={display}>
          {`${truncate({value: label, size: pieConfig.LABEL_TRUNCATE})} (${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  render () {
    const { data, active, labelKey, valueKey } = this.props
    if (!data.length || (data.length === 1 && !data[0].value)) {
      return (
        <Responsive>
          <NoData text='No matching lessons with average response time found for the filters.' />
        </Responsive>
      )
    }

    return (
      <Responsive>
        <PieChart >
          <Tooltip />
          <Pie
            startAngle={-270}
            endAngle={90}
            minAngle={1}
            paddingAngle={0.5}
            data={data}
            dataKey={valueKey}
            nameKey={labelKey}
            outerRadius='40%'
            label={this.getCustomizedLabel}
            labelLine={false}
            onClick={this.handleOnClick}
          >
            {
              data.map((entry, index) => (
                <Cell
                  key={`cell-${entry[labelKey]}`}
                  cursor='pointer'
                  fill={entry[labelKey] === active ? chartColors.SELECTED : chartColors.PRIMARY}
                />
              ))
            }
          </Pie>
        </PieChart>
      </Responsive>
    )
  }
}

PieGraph.propTypes = propTypes
PieGraph.defaultProps = defaultProps

export default PieGraph
