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
        <Menu.Item className="ui center aligned header">
          <Link to="/" className="home-link">Get Happy NYC</Link>
        </Menu.Item>
      </Menu>
    )
  }
}
