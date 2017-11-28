import React, { Component } from 'react';
import MapContainer from './map/MapContainer';
import { connect } from 'react-redux';
import { Button, Form, Grid, Select, Card } from 'semantic-ui-react';
import { sortedByDayAndNeighborhood } from './actions/venues.js'
import List from './List.js'
import { dayOptions, neighborhoodOptions } from './helpers/selectOptions'


class HomeContainer extends Component {

  state = {
    dayInput: "Sunday",
    neighborhoodInput: "Astoria",
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

  handleSubmit = () => {
    this.props.sortedByDayAndNeighborhood(this.state.dayInput, this.state.neighborhoodInput, this.props.venues)
  }


  render() {
    return (
      <Grid className="form-wrapper" stackable columns={3} divided>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card >
              <Card.Content>
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
          </Grid.Column>
          <Grid.Column width={12}>
            <MapContainer />
          </Grid.Column>
        </Grid.Row>
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
  sortedByDayAndNeighborhood,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
