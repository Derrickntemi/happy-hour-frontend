import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react'


class List extends React.Component {


  dayOfWeekAsString = () => {
    let today = new Date()
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return weekdays[today.getDay()]
  }



  render() {
    const venues = this.props.currentVenues.map((venue, idx) => {
      const day = this.props.userLocation.length ? this.dayOfWeekAsString().toLowerCase() : this.props.currentDay.toLowerCase()
      const special = venue.specials.find(special => special.day.toLowerCase() === day)
      if (special) {
        return(
          <Table.Row key={idx}>
            <Table.Cell >
              <Link
                className="venue-names-links"
                to={`/venue/${venue.id}`}
              >
                {venue.venue_name}
              </Link>
            </Table.Cell>
            <Table.Cell>{special.special}</Table.Cell>
            <Table.Cell>{special.time}</Table.Cell>
          </Table.Row>
        )
      }
    })

    return(
      <div className="results-table-wrapper">
        {this.props.isLoading ? <p>Loading</p> : null}
        {!this.props.currentVenues.length ? null :
          <Table celled className="results-table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Bar Name</Table.HeaderCell>
                <Table.HeaderCell>Special</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {venues}
            </Table.Body>
          </Table>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return ({
    venues: state.venues,
    currentVenues: state.currentVenues,
    currentDay: state.currentDay,
    isLoading: state.isLoading,
    userLocation: state.userLocation,

  })
}


export default connect(mapStateToProps, null)(List);
