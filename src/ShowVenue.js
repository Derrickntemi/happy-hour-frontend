import React from 'react'
import { connect } from 'react-redux'
import { findVenueById } from './helpers/findVenueById'
import MapContainer from './MapContainer'
import { setCurrentVenues } from './actions/venues.js'


class ShowVenue extends React.Component {

  getSpecialsDetails = (venue) => {
    return venue.specials.map((special, idx) => {
      return(
        <tr key={idx}>
          <td>{special.day}</td>
          <td>{special.special}</td>
          <td>{special.time}</td>
        </tr>
      )})
    }

  setVenueData = (id, venues) => {
    const venue = findVenueById(parseInt(id), venues)
    this.props.setCurrentVenues([venue])
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.venues.length > 0 && this.venue === undefined)
      this.setVenueData(this.props.match.params.id, nextProps.venues)
  }

  render() {
    if (this.props.venues.length > 0) {
      const venue = this.props.venues[0]
      return(
        <div>
          <div className="venue-info-wrapper">
            <h1>{venue.venue_name}</h1>
              <h3>{venue.address}</h3>
              <h3>
                {venue.city}, {venue.state} {venue.zipcode}
              </h3>
              <h3>{venue.phone_number}</h3>
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
                {this.getSpecialsDetails(venue)}
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
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    setCurrentVenues: (sortedVenues) => { dispatch(setCurrentVenues(sortedVenues)) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowVenue)