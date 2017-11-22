import React, { Component } from 'react';
import MapContainer from './MapContainer'


export default class Home extends Component {

  state = {
    dayInput: '',
    neighborhoodInput: '',
  }

  componentDidMount = () => {
    this.handleFetch()
  }

  handleFetch = () => {
    fetch("http://localhost:3000/specials")
      .then(res => res.json())
      .then(json => console.log(json))
  }

  handleInputDayChange = (event) => {
    this.setState({
      dayInput: event.target.value
    })
  }

  handleInputDayChange = (event) => {
    this.setState({
      neighborhoodInput: event.target.value
    })
  }

  render() {
    return (
      <div className="form-wrapper">
        <form className="search-form-wrapper" onSubmit={this.handleFetch}>
          <input type="text" placeholder="Day" onChange={this.handleInputDayChange}/>
          <input type="text" placeholder="Neighborhood" onChange={this.handleInputNeighborhoodChange}/>
          <button type="submit" >Search</button>
        </form>
      </div>
    );
  }
}
