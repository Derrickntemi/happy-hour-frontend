import React, { Component } from 'react';
import MapContainer from './MapContainer';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';
import { fetchVenuesAction } from './actions/venues.js'

class HomeContainer extends Component {

  componentDidMount = () => {
    this.props.fetchVenuesAction()
  }

  handleInputDayChange = (event) => {
    this.setState({
      dayInput: event.target.value
    })
  }

  handleInputDayChange = (event) => {
    this.setState({
      neighborhoodInput: event.target.value
    })
  }

  render() {
    console.log("this.props", this.props.venues)
    return (
      <Grid className="form-wrapper" columns={3} divided>
        <MapContainer />
        <Form>
          <Form.Field className="search-form-wrapper" onSubmit={this.handleFetch}>
            <input type="text" placeholder="Day" onChange={this.handleInputDayChange}/>
            <input type="text" placeholder="Neighborhood" onChange={this.handleInputNeighborhoodChange}/>
            <Button primary type="submit" >Search</Button >
          </Form.Field>
        </Form>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return ({
    venues: state.venues,
    isLoading: state.isLoading
  })
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVenuesAction: () => {
      dispatch(fetchVenuesAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
