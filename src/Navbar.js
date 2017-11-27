import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item className="ui center aligned header">Get Happy NYC</Menu.Item>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
         >
         <Link to="/">Home</Link>
        </Menu.Item>

      </Menu>
    )
  }
}
