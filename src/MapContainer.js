import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'




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
    center: {lat: 40.74, lng: -73.99},
    zoom: 12
  }

  findCenterOfMap = () => {
    const latAverage = _.meanBy(this.props.currentVenues, venue => venue.latitude)
    const lngAverage = _.meanBy(this.props.currentVenues, venue => venue.longitude)
    this.setState({
      center: {latAverage, lngAverage},
      zoom: 15
    })

  }

  outputMarkers = () => {
    return this.props.currentVenues.map(venue => {
      console.log("lat", venue.latitude)
      console.log("long", venue.longitude)
      return <AnyReactComponent lat={venue.latitude} lng={venue.longitude}/>
    })
  }


  render() {
    return (
      <Container fluid className="google-map-wrapper">
         <GoogleMapReact className="google-map"
         bootstrapURLKeys={{
           key: "AIzaSyA3_XMllsvSYDPbcd971r_cyzS9XbePXHk",
         }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {this.outputMarkers()}
        </GoogleMapReact>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    currentVenues: state.currentVenues
  }
}

export default connect(mapStateToProps, null)(MapContainer)
