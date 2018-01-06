import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import HomeContainer from './home/HomeContainer'
import Navbar from './Navbar'
import ShowVenue from './home/ShowVenue'
import Edit from './home/Edit.js'
import Add from './home/Add.js'
// import { setLocation } from './map/Geolocation'
import { fetchVenuesAction, setUserLocation } from './actions/venues.js'

class App extends Component {


  componentDidMount = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("position", pos)
        this.props.setUserLocation([pos.coords.latitude, pos.coords.longitude])
      })
    } else {
      alert("Geolocation is not supported by this browser.")
    }
    this.props.fetchVenuesAction()
  }


  render() {
    return (
      <div className="app-top-div">
        <Navbar />
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/venue/:id" component={ShowVenue} />
        <Route path="/venue/:id/edit" component={Edit} />
        <Route path="/venues/create" component={Add} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchVenuesAction,
  setUserLocation
}

export default withRouter(connect(null, mapDispatchToProps)(App))
