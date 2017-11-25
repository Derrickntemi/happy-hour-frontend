import React, { Component } from 'react';
import MapContainer from './MapContainer';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';
import { fetchVenuesAction, sortedByDayAndNeighborhood } from './actions/venues.js'
import List from './List.js'


class HomeContainer extends Component {

  state = {
    dayInput: "Sunday",
    neighborhoodInput: "",
  }

  componentDidMount = () => {
    this.props.fetchVenuesAction()
  }

  handleInputDayChange = (event) => {
    console.log("log day", event.target.value)
    console.log("log state", this.state.dayInput)
    this.setState({
      dayInput: event.target.value
    })
  }

  handleInputNeighborhoodChange = (event) => {
    this.setState({
      neighborhoodInput: event.target.value
    })
  }

  handleSubmit = () => {
    console.log("handleSubmit", this.props.venues)
    this.props.sortedByDayAndNeighborhood(this.state.dayInput, this.state.neighborhoodInput, this.props.venues)
  }


  render() {
    console.log("current", this.props.currentVenues)
    return (
      <Grid className="form-wrapper" columns={3} divided>
        <MapContainer />
        <Form>
          <Form.Field className="search-form-wrapper" >
            <label htmlFor="day" >Day of the Week</label>
            <select name="day" id="day" onChange={this.handleInputDayChange} value={this.state.dayInput}>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
            <input
              type="text"
              placeholder="Neighborhood"
              onChange={this.handleInputNeighborhoodChange}
            />
            <Button primary type="submit" onClick={this.handleSubmit}>Search</Button >
          </Form.Field>
        </Form>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return ({
    venues: state.venues,
    isLoading: state.isLoading,
    currentVenues: state.currentVenues
  })
}

const mapDispatchToProps = {
  fetchVenuesAction,
  sortedByDayAndNeighborhood,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
