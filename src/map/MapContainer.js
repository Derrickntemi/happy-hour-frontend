import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import _ from 'lodash'
import findDistance from '../helpers/findDistance.js'
import { setCurrentVenues, setLastVenueSearched } from '../actions/venues.js'
import { Popup, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


const Marker = ({ venue }) => (
  <div className="popup-wrapper">
    <Popup
     className="marker-pop-up"
     trigger={ <div className="pin1" />}
     on='click'
    >
      <Popup.Header className="popup-header">
        <Link
          to={`/venue/${venue.id}`}
          className="popup-header-link"
        >
          {venue.venue_name}
        </Link>
      </Popup.Header>
     <Popup.Content>
        {venue.address}
     </Popup.Content>
    </Popup>
  </div>
);

class MapContainer extends React.Component {

  state = {
    center: [40.74, -73.99],
    zoom: 12,
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
    if(nextProps.userLocation.length && nextProps.currentVenues.length === 0 && this.props.venues.length){
      this.setState({
        center: [nextProps.userLocation[0], nextProps.userLocation[1]],
        zoom: 15
      })
      const distanceArray = this.props.venues.map((venue, idx) => {
        const distance = findDistance(nextProps.userLocation[0], nextProps.userLocation[1], venue.latitude, venue.longitude)
        return Object.assign({}, venue, { distance: distance })
      })
      const sortedByDistance = _.sortBy(distanceArray, ["distance"])
      const nearestVenues = sortedByDistance.slice(0, 20)
      this.props.setCurrentVenues(nearestVenues)
      this.props.setLastVenueSearched(nearestVenues)
    } else if(nextProps.currentVenues.length) {
      this.getAverageLatLng(nextProps.currentVenues)
      nextProps.setLastVenueSearched(nextProps.currentVenues)
    }
  }

  componentDidMount() {
    if(this.props.currentVenues.length){
      this.getAverageLatLng(this.props.currentVenues)
    }
  }

  outputMarkers = () => {
    return this.props.currentVenues.map((venue, idx) => {
      return (
        <Marker
          lat={venue.latitude}
          lng={venue.longitude}
          key={idx}
          venue={venue}
        />
      )
    })
  }

  loadingIcon = () => {
    if(this.props.userLocation.length){
      this.setState({
        isLoading: true,
      })
    } else {
      <Segment className="current-location-loader">
        <Dimmer active inverted>
          <Loader inverted>Finding Your Location</Loader>
        </Dimmer>
        <Image src='/assets/images/wireframe/short-paragraph.png' />
      </Segment>
    }
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
        { this.outputMarkers() }
      </GoogleMapReact>
        {this.props.isLoading ?
          <div className="loader-div">
            <Loader
              active
              inline='centered'
              size='medium'
              className="current-location-loader"
            >
              Finding Your Location
            </Loader>
          </div>
          : null
        }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentVenues: state.currentVenues,
    venues: state.venues,
    userLocation: state.userLocation,
    lastVenueSearched: state.lastVenueSearched,
    isLoading: state.isLoading

  }
}

const mapDispatchToProps = {
  setCurrentVenues,
  setLastVenueSearched,

}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
