import React from 'react'
import { connect } from 'react-redux'
import { findVenueById } from './helpers/findVenueById'
import MapContainer from './MapContainer'
import { sortedByDayAndNeighborhood } from './actions/venues.js'



class ShowVenue extends React.Component {

  state = {
    venueById: null
  }

  getSpecialsDetails = () => {
    if(this.state.venueById) {
      return this.state.venueById.specials.map((special, idx) => {
        return(
          <tr key={idx}>
            <td>{special.day}</td>
            <td>{special.special}</td>
            <td>{special.time}</td>
          </tr>
        )})
      } else {
        return <tr><td>Loading</td></tr>
      }
    }




  componentWillMount(){
    this.setState({
      venueById: findVenueById(this.props.match.params.id, this.props.venues)
    })
    console.log("logg the venue", this.state.venueById)
  }

  componentWillReceiveProps(nextProps){
    if(!this.state.venueById){
      this.setState({
        venueById: findVenueById(nextProps.match.params.id, nextProps.venues)
      })
    }
  }

  // day, neighborhood, allVenues

  render() {
    if(this.state.venueById){
      console.log("logged props", this.props.venues)
      return(
        <div>
          <div className="venue-info-wrapper">
            <h1>{this.state.venueById.venue_name}</h1>
              <h3>{this.state.venueById.address}</h3>
              <h3>
                {this.state.venueById.city}, {this.state.venueById.state} {this.state.venueById.zipcode}
              </h3>
              <h3>{this.state.venueById.phone_number}</h3>
          </div>
          <MapContainer />
          <div className="venue-specials-table-wrapper">
            <table className="ui celled table venue-specials-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Special</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {this.getSpecialsDetails()}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return <h1>Loading</h1>
    }
  }
}

function mapStateToProps(state) {
  return ({
    venues: state.venues,
    currentVenues: state.currentVenues
  })
}

const mapDispatchToProps = {
  sortedByDayAndNeighborhood,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowVenue)
