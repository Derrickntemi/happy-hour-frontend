import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import findDistance from '../helpers/findDistance.js'
import { setCurrentVenues, setLastVenueSearched } from '../actions/venues.js'

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 6, width: 6, top: -20, left: -30,
  }}>
    {text}
  </div>
);

class MapContainer extends React.Component {

  state = {
    center: [40.74, -73.99],
    zoom: 12
  }

  getAverageLatLng = (currentVenues) => {
    const latAverage = _.meanBy(currentVenues, venue => venue.latitude)
    const lngAverage = _.meanBy(currentVenues, venue => venue.longitude)

    this.setState({
      center: [latAverage, lngAverage],
      zoom: 15
    })
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.userLocation.length && !nextProps.currentVenues.length){
      this.setState({
        center: [nextProps.userLocation[0], nextProps.userLocation[1]],
        zoom: 15
      })
      console.log('venues', this.props.venues)
      const distanceArray = this.props.venues.map((venue, idx) => {
        const distance = findDistance(nextProps.userLocation[0], nextProps.userLocation[1], venue.latitude, venue.longitude)
        return Object.assign({}, venue, { distance: distance })
      })
      const sortedByDistance = _.sortBy(distanceArray, ["distance"])
      const nearestVenues = sortedByDistance.slice(0, 20)
      this.props.setCurrentVenues(nearestVenues)
      this.props.setLastVenueSearched(nearestVenues)
      console.log("nearest", this.props.lastVenueSearched)

    } else if(nextProps.currentVenues.length) {
      this.getAverageLatLng(nextProps.currentVenues)
      nextProps.setLastVenueSearched(nextProps.currentVenues)
      console.log("searched venue", this.props.lastVenueSearched)

    }
  }

  componentDidMount() {
    if(this.props.currentVenues.length){
      this.getAverageLatLng(this.props.currentVenues)
    }
  }

  outputMarkers = () => {
    return this.props.currentVenues.map((venue, idx) => {
      return <AnyReactComponent lat={venue.latitude} lng={venue.longitude} key={idx}/>
    })
  }


  render() {
    return (
      <Container fluid className="google-map-wrapper">
         <GoogleMapReact className="google-map"
         bootstrapURLKeys={{
           key: "AIzaSyA3_XMllsvSYDPbcd971r_cyzS9XbePXHk",
         }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
        {this.outputMarkers()}
        </GoogleMapReact>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentVenues: state.currentVenues,
    venues: state.venues,
    userLocation: state.userLocation,
    lastVenueSearched: state.lastVenueSearched

  }
}

const mapDispatchToProps = {
  setCurrentVenues,
  setLastVenueSearched,

}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
