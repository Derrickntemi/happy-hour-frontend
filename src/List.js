import React from './react'
import { connect } from 'react-redux'


class List extends React.Component {

  render(){
    const venues = this.props.venues.map(venue => {
      return <li>{venue.venue_name}</li>
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
    isLoading: state.isLoading
  })
}


export default connect(mapStateToProps, null)(List);
