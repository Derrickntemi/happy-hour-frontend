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
    searchInput: "",
  }

  componentDidMount = () => {
    if(this.props.lastVenueSearched.length){
      this.props.setCurrentVenues(this.props.lastVenueSearched)
    }
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

  handleSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value
    })
  }

  handleSearch = (event) => {
    if(this.props.venues){
      const searchedVenue = this.props.venues.filter(venue => {
        return venue.venue_name.toLowerCase().includes(this.state.searchInput.toLowerCase())
      })
      this.props.setCurrentVenues(searchedVenue)
    } else {
      return alert("No venue matches that name, please add it below!")
    }
  }

  handleSubmit = () => {
    this.props.sortedByDayAndNeighborhood(this.state.dayInput, this.state.neighborhoodInput, this.props.venues)
  }


  render() {
    return (
      <Grid className="form-wrapper" stackable columns={3} divided>
        <Grid.Row>
          <Grid.Column width={4} className="column-with-search-and-add">
            <Card className="search-form-card-wrapper">
              <Card.Content className="search-form-card">
                <Form className="search-form-wrapper">
                  <Form.Field>
                    <label>Search for a Specific Bar</label>
                    <input
                      onChange={this.handleSearchInput} value={this.state.searchInput}
                    />
                  </Form.Field>
                  <div className="search-by-name-div">
                    <Button
                      onClick={this.handleSearch}
                      type='submit'
                      className="search-by-name-button"
                    >
                      Search
                    </Button>
                  </div>
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
                  <div className="form-button-wrapper">
                    <Button
                      type="submit"
                      onClick={this.handleSubmit}
                      className="form-button"
                    >
                      Search
                    </Button >
                  </div>
                </Form>
              </Card.Content>
            </Card>
            <div className="add-new-button-wrapper">
              <Button className="add-new-listing-button">
                <Link className="add-new-listing-a" to="/venues/create">Add a New Listing</Link>
              </Button>
            </div>
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
