import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { findVenueById } from '../helpers/findVenueById'
import MapContainer from '../map/MapContainer'
import { setCurrentVenues } from '../actions/venues.js'
import CommentContainer from '../comments/CommentContainer'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import Edit from './Edit.js'


class ShowVenue extends React.Component {

  state = {
    venue: null,
  }
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
    const venue = findVenueById(parseInt(id, 10), venues)
    console.log("this venue", venue)
    this.props.setCurrentVenues([venue])
    this.setState({
      venue: venue
    })
  }

  componentDidMount = () => {
    if(this.props.venues.length > 0){
      this.setVenueData(this.props.match.params.id, this.props.venues)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.venues.length > 0 && this.venue === undefined){
      this.setVenueData(this.props.match.params.id, nextProps.venues)
    }
  }

  render() {
    if (this.state.venue) {
      return(
        <div>
          <div className="venue-info-wrapper">
            <h1>{this.state.venue.venue_name}</h1>
              <h3>{this.state.venue.address}</h3>
              <h3>
                {this.state.venue.city}, {this.state.venue.state} {this.state.venue.zipcode}
              </h3>
              <h3>{this.state.venue.phone_number}</h3>
              <Link to={`/venue/${this.state.venue.id}/edit`}>Edit this listing</Link>
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
                {this.getSpecialsDetails(this.state.venue)}
              </tbody>
            </table>
            < CommentContainer match={this.props.match}/>
          </div>
        </div>
      )
    } else {
      return (
        <Segment className="loading-icon">
          <Dimmer active inverted>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
          <Image src='/assets/images/wireframe/short-paragraph.png' />
        </Segment>
      )
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
