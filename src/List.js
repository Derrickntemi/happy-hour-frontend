import React from 'react'
import { connect } from 'react-redux'


class List extends React.Component {

  render(){
    const venues = this.props.currentVenues.map((venue, idx) => {
      console.log("venue name", venue.venue_name)
      return <li key={idx}>{venue.venue_name}</li>
    })
    return(
      <div>
      {this.props.isLoading ? <p>Loading</p> : null}
        <ul>
        {venues}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state);

  return ({
    venues: state.venues,
    currentVenues: state.currentVenues,
    isLoading: state.isLoading
  })
}


export default connect(mapStateToProps, null)(List);
