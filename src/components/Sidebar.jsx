import React, { Component } from 'react'
import { Sidebar as SemanticSidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = { visible: false }

    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  toggleVisibility () {
    this.setState({ visible: !this.state.visible })
  }

  render () {
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <SemanticSidebar.Pushable as={Segment}>
          <SemanticSidebar as={Menu} animation='uncover' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </SemanticSidebar>
          <SemanticSidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='/assets/images/wireframe/paragraph.png' />
            </Segment>
          </SemanticSidebar.Pusher>
        </SemanticSidebar.Pushable>
      </div>
    )
  }
}

export default Sidebar
