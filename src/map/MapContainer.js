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
    this.getAverageLatLng(nextProps.currentVenues)
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
    currentVenues: state.currentVenues
  }
}

export default connect(mapStateToProps, null)(MapContainer)
