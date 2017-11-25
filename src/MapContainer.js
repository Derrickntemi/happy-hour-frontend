import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Container } from 'semantic-ui-react'



const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,
  }}>
    {text}
  </div>
);

export default class MapContainer extends React.Component {
  static defaultProps = {
    center: {lat: 40.74, lng: -73.99},
    zoom: 11
  };


  // has use of this.props.neighborhood and this.props.day
  
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
          <AnyReactComponent
            lat={40.737133}
            lng={-73.987950}
          />
        </GoogleMapReact>
      </Container>
    );
  }
}
