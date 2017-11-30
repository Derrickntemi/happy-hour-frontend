import React, { Component } from 'react';
import './App.css';
import { Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import HomeContainer from './home/HomeContainer'
import Navbar from './Navbar'
import ShowVenue from './home/ShowVenue'
import { fetchVenuesAction } from './actions/venues.js'

class App extends Component {

  componentDidMount = () => {
    this.props.fetchVenuesAction()
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={HomeContainer} />
        <Route path="/venue/:id" component={ShowVenue} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchVenuesAction,
}

export default withRouter(connect(null, mapDispatchToProps)(App))
