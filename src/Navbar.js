import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <Menu>
        <Menu.Item className="ui center aligned header">
          <Link to="/" className="home-link">GetHappyNYC</Link>
        </Menu.Item>
      </Menu>
    )
  }
}
