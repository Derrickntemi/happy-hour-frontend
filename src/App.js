import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import HomeContainer from './home/HomeContainer'
import Navbar from './Navbar'
import ShowVenue from './home/ShowVenue'
import Edit from './home/Edit.js'
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
        <Route exact path="/venue/:id" component={ShowVenue} />
        <Route path="/venue/:id/edit" component={Edit} />

      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchVenuesAction,
}

export default withRouter(connect(null, mapDispatchToProps)(App))
