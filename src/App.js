import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeContainer from './HomeContainer'
import MapContainer from './MapContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeContainer />
      </div>
    );
  }
}

export default App;
