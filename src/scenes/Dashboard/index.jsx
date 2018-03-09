import React, { Component } from 'react'
import { Responsive, Card, Button, Header, Grid, Segment, Divider, Dropdown } from 'semantic-ui-react'
import './index.css'

import TabularForm from '../../components/Table'
import AccordionComponent from '../../components/Accordion'
import FilterRenderer from '../../components/FilterRenderer'
import BarGraph from '../../components/Graphs/BarGraph'
import PieGraph from '../../components/Graphs/PieGraph'
import NoData from '../../components/NoData'

import { filterKeys } from '../../utils/configurations/filtersConfig'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mobileMenu: 768
    }
  }

  handlePrint = () => {
    window.print()
  }

  handleMobileMenuClick = () => {
    let { mobileMenu } = this.state
    mobileMenu = mobileMenu ? 0 : 768
    this.setState({mobileMenu})
  }

  handleRowClick = (data) => {
    console.log(`Row Clicked:  ${JSON.stringify(data)} `)
  }

  render () {
    const { mobileMenu } = this.state

    let {
      active,
      onChange,
      data,
      config,
      match,
      location,
      history,
      staticContext,
      filterData,
      filteredData,
      onMenuChange,
      activeIndexes,
      barSummary,
      pieSummary,
      selectedGraphModule,
      selectedGraphLesson,
      onGraphClick,
      onOptionClick,
      selectedSummaryKey,
      ...rest
    } = this.props

    const columns = [
      { label: 'Module', key: filterKeys.module },
      { label: 'Lessons', key: filterKeys.lesson },
      { label: 'Student', key: filterKeys.studentId },
      { label: 'Average Time (sec)', key: filterKeys.avgTime }
    ]

    let viewAsOptions = [

      {
        text: 'Average Time',
        value: filterKeys.avgTime
      },
      {
        text: 'Average Attempts',
        value: filterKeys.attempts
      }
    ]

    return (
      <Grid padded>
        <Grid.Column mobile={16} only='mobile' >
          <Dropdown text='Filter' icon='filter' fluid labeled button className='icon' onClick={this.handleMobileMenuClick} />
        </Grid.Column>
        <Grid.Column largeScreen={4} computer={5} tablet={5} mobile={16} >
          <Responsive minWidth={mobileMenu}>
            <AccordionComponent
              active={active}
              config={config}
              data={data}
              onChange={onChange}
              activeIndexes={activeIndexes}
              onMenuChange={onMenuChange}
              {...rest}
            />
          </Responsive>
        </Grid.Column>
        <Grid.Column largeScreen={12} computer={11} mobile={16} tablet={11} id='print-area'>
          <Segment attached='top'>
            <Grid verticalAlign='middle' centered>
              <Grid.Column floated='left' computer={9} >
                <Header>
                  District Admin Dashboard
                </Header>
              </Grid.Column>
              <Grid.Column floated='left' computer={7} textAlign='right' >
                <Dropdown
                  placeholder='View As'
                  fluid
                  selection
                  options={viewAsOptions}
                  value={selectedSummaryKey}
                  onChange={(event, data) => onOptionClick(data.value)}
                />
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment attached='bottom'>
            <Grid verticalAlign='middle' >
              <FilterRenderer filterData={filterData} onChange={this.props.onClick} />
              <Grid.Column floated='right' computer={3} tablet={4} mobile={4} textAlign='right' >
                <Button floated='right' id='print-button'
                  icon='print'
                  label={{ as: 'a', basic: true, content: 'Print' }}
                  labelPosition='left'
                  color='teal'
                  onClick={this.handlePrint}
                />
              </Grid.Column>
            </Grid>

            <Divider />
            { (!filteredData.length && !pieSummary.length && !barSummary.length)
              ? <NoData text={'No matching data found for the filters. Please change the filters and try again.'} />
              : <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column mobile={16} tablet={16} computer={8} >
                    <Grid padded='vertically'>
                      <Grid.Column width={16} >
                        <Card fluid>
                          <Card.Content>
                            <BarGraph
                              data={barSummary}
                              active={selectedGraphModule}
                              onClick={(data) => onGraphClick(data, 'module')}
                            />
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={16} computer={8} >
                    <Grid padded='vertically'>
                      <Grid.Column width={16} >
                        <Card fluid>
                          <Card.Content>
                            <PieGraph
                              data={pieSummary}
                              active={selectedGraphLesson}
                              onClick={(data) => onGraphClick(data, 'lesson')}
                            />
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column computer={16} mobile={16} tablet={16}>
                    <TabularForm data={filteredData} columns={columns} pagination onClick={this.handleRowClick} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
export default Dashboard
