import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';



class List extends React.Component {

  render(){
    const venues = this.props.currentVenues.map((venue, idx) => {
      const special = venue.specials.find(special => {
        return special.day.toLowerCase() === this.props.currentDay.toLowerCase()})
      const deal = special.special
      const time = special.time
      return(
        <tr key={idx}>
          <td><Link to={`/venue/${venue.id}`}>{venue.venue_name}</Link></td>
          <td>{deal}</td>
          <td>{time}</td>
        </tr>
      )
    })

    return(
      <div className="results-table-wrapper">
      {this.props.isLoading ? <p>Loading</p> : null}
      {!this.props.currentVenues.length ? null :
        <table className="ui celled table results-table">
          <thead>
            <tr>
              <th>Bar Name</th>
              <th>Special</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          {venues}
          </tbody>
        </table>
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
    isLoading: state.isLoading
  })
}


export default connect(mapStateToProps, null)(List);
