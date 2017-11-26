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
    neighborhoodInput: "Astoria",
  }

  componentDidMount = () => {
    this.props.fetchVenuesAction()
  }

  handleInputDayChange = (event) => {
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
    this.props.sortedByDayAndNeighborhood(this.state.dayInput, this.state.neighborhoodInput, this.props.venues)
  }


  render() {
    return (
      <Grid className="form-wrapper" columns={3} divided>
        <MapContainer />
        <Form>
          <Form.Field className="search-form-wrapper" >
            <label htmlFor="day" className="day-label">Day of the Week</label>
            <select name="day" id="day" onChange={this.handleInputDayChange} value={this.state.dayInput}>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
            <label htmlFor="neighborhood" className="neighborhood-label">Where</label>
            <select name="neighborhood" id="neighborhood" onChange={this.handleInputNeighborhoodChange} value={this.state.neighborhoodInput}>
              <option value="Astoria">Astoria</option>
              <option value="Chelsea">Chelsea</option>
              <option value="East Village">East Village</option>
              <option value="Financial District">Financial District</option>
              <option value="Flatiron">Flatiron</option>
              <option value="Greenwich Village">Greenwich Village</option>
              <option value="Hell\'s Kitchen">Hells Kitchen</option>
              <option value="Hoboken">Hoboken</option>
              <option value="Jersey City">Jersey City</option>
              <option value="Kips Bay">Kips Bay</option>
              <option value="Lower East Side">Lower East Side</option>
              <option value="Manhattan Valley">Manhattan Valley</option>
              <option value="Meatpacking District">Meatpacking District</option>
              <option value="Midtown East">Midtown East</option>
              <option value="Midtown West">Midtown West</option>
              <option value="Murray Hill">Murray Hill</option>
              <option value="NoHo">NoHo</option>
              <option value="Nolita">Nolita</option>
              <option value="Park Slope">Park Slope</option>
              <option value="SoHo">SoHo</option>
              <option value="Theater District">Theater District</option>
              <option value="TriBeCa">TriBeCa</option>
              <option value="Union Square">Union Square</option>
              <option value="Upper West Side">Upper West Side</option>
              <option value="West Village">West Village</option>
              <option value="Williamsburg">Williamsburg</option>
            </select>
            <Button primary type="submit" onClick={this.handleSubmit} className="form-button">Search</Button >
          </Form.Field>
        </Form>
        <List />
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
