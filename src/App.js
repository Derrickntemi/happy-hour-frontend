import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import HomeContainer from './home/HomeContainer'
import Navbar from './Navbar'
import ShowVenue from './home/ShowVenue'
import Edit from './home/Edit.js'
import Add from './home/Add.js'
import { fetchVenuesAction, setUserLocation, setIsLoading } from './actions/venues.js'

class App extends Component {


  componentDidMount = () => {
    if(navigator.geolocation){
      this.props.setIsLoading(true)
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("position", pos)
        this.props.setUserLocation([pos.coords.latitude, pos.coords.longitude])
        this.props.setIsLoading(false)
      })
    } else {
      alert("Geolocation is not supported by this browser.")
    }

    this.props.fetchVenuesAction()

  }


  render() {
    // if(window.location.protocol !== "https:"){
    //   window.location.href = "https:" + window.location.href.substring(window.location.protocol.length)
    //   alert("You are being redirected to a secure address")
    // }
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
  setUserLocation,
  setIsLoading
}

export default withRouter(connect(null, mapDispatchToProps)(App))
