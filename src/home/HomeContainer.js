import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MapContainer from '../map/MapContainer';
import { Button, Form, Grid, Select, Card } from 'semantic-ui-react';
import { sortedByDayAndNeighborhood, setLastVenueSearched, setCurrentVenues } from '../actions/venues.js'
import List from './List.js'
import { dayOptions, neighborhoodOptions } from '../helpers/selectOptions'


class HomeContainer extends Component {

  state = {
    dayInput: "",
    neighborhoodInput: "",
  }

  handleInputDayChange = (event, data) => {
    this.setState({
      dayInput: data.value
    })
  }

  handleInputNeighborhoodChange = (event, data) => {
    this.setState({
      neighborhoodInput: data.value
    })
  }

  componentDidMount = () => {
    if(this.props.lastVenueSearched.length){
      this.props.setCurrentVenues(this.props.lastVenueSearched)
      console.log("this.props.lastVenueSearched", this.props.lastVenueSearched)
    }
  }

  handleSubmit = () => {
    this.props.sortedByDayAndNeighborhood(this.state.dayInput, this.state.neighborhoodInput, this.props.venues)

  }


  render() {
    return (
      <Grid className="form-wrapper" stackable columns={3} divided>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card >
              <Card.Content className="search-form-card">
                <Form className="search-form-wrapper">
                  <Form.Field  >
                    <label htmlFor="day" className="day-label">Day of the Week</label>
                    <Select
                      name="day"
                      id="day"
                      onChange={this.handleInputDayChange}
                      value={this.state.dayInput}
                      placeholder='Day'
                      options={dayOptions}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="neighborhood" className="neighborhood-label">Where</label>
                    <Select
                      name="neighborhood"
                      id="neighborhood"
                      onChange={this.handleInputNeighborhoodChange}
                      value={this.state.neighborhoodInput}
                      placeholder='Neighborhood'
                      options={neighborhoodOptions}
                    />
                  </Form.Field>
                  <Button type="submit" onClick={this.handleSubmit} className="form-button">Search</Button >
                </Form>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Link to="/venues/create">Add a New Listing</Link>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <MapContainer />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={14}>
            <List />
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}

function mapStateToProps(state){
  return ({
    venues: state.venues,
    isLoading: state.isLoading,
    currentVenues: state.currentVenues,
    lastVenueSearched: state.lastVenueSearched
  })
}

const mapDispatchToProps = {
  sortedByDayAndNeighborhood,
  setLastVenueSearched,
  setCurrentVenues,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
