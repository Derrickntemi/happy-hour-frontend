import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeContainer from './HomeContainer.js'
import MapContainer from './MapContainer.js'
import { Route } from 'react-router-dom'
import Navbar from './Navbar.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer />
        <Navbar />
        <Route exact path='/' component={HomeContainer} />
      </div>
    );
  }
}

export default App;
