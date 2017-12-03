import React from 'react'
import { connect } from 'react-redux';
import geocoder from 'geocoder'
import HomeContainer from './HomeContainer'
import { Button, Form, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { findVenueById } from '../helpers/findVenueById'
import { setCurrentVenues } from '../actions/venues.js'




class Edit extends React.Component {

  state = {
    venue: null,
    name: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    number: '',
    specials: [],
    latitude: '',
    longitude: ''
  }
  getSpecialsDetails = (venue) => {
    if(venue){
      return this.state.specials.map((special, idx) => {
        return(
          <div key={idx}>
            <Form.Field >
              <label>{special.day}&#39;s Special</label   >
              <input onChange={(e) => this.handleSpecialChange(special.day, e)} value={special.special} />
            </Form.Field>
            <Form.Field>
              <label>{special.day}&#39;s Happy Hour Time</label>
              <input onChange={(e) => this.handleTimeChange(special.day, e)} value={special.time} />
            </Form.Field>
          </div>
        )
      })
    }
  }

  handleTimeChange = (day, event) => {
    console.log("day", day)
    console.log("event", event)

    if(this.state.venue.specials.length){
      const newTime = this.state.specials.map(special => {
        console.log("time", special.time)
        if(special.day === day){
          return Object.assign({}, special, {time: event.target.value})
        } else {
          return special
        }
      })
      console.log("newTime", newTime)
      this.setState({
        specials: newTime
      }, () => { console.log('state', this.state) })
    }
  }

  handleSpecialChange = (day, event) => {
    if(this.state.venue.specials.length){
      const newSpecials = this.state.specials.map(special => {
        if(special.day === day){
          return Object.assign({}, special, {special: event.target.value})
        } else {
          return special
        }
      })
      this.setState({
        specials: newSpecials
      })
    }
  }


  setVenueData = (id, venues) => {
    const venue = findVenueById(parseInt(id, 10), venues)
    console.log("this venue", venue)
    this.props.setCurrentVenues([venue])
    this.setState({
      venue: venue,
      name: venue.venue_name,
      address: venue.address,
      city: venue.city,
      state: venue.state,
      zipcode: venue.zipcode,
      number: venue.phone_number,
      specials: venue.specials,
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.venues.length > 0){
      console.log("logged venues", nextProps.venues)
      this.setVenueData(this.props.match.params.id, nextProps.venues)
    }
  }

  handleInputChange = (input, value) => {
    this.setState({
      [input]: value
    })
  }

  getLatAndLong = () => {
    console.log("address", this.state.address)
    const address = `${this.state.address} ${this.state.city}, ${this.state.state} ${this.state.zipcode}`
    return geocoder.geocode(address, (err, results) => {
      results.forEach((result) => {
        const lat = result.geometry.location.lat();
        console.log("latitude", lat)
        console.log("longitude", lng)

        const lng = result.geometry.location.lng();
        this.setState({
          latitude: lat,
          longitude: lng,
        })
      })
    })
  }

  handleEditSubmit = () => {
    this.getLatAndLong()
    if(this.state.latitude > 0){
      const editVenueObj = {
        name: this.state.name,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        number: this.state.number,
        specials: this.state.specials,
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
      return fetch(`http://localhost:3000/venues/${this.state.venue.venue_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(editVenueObj)
      })
      .then(res => res.json())
      .then(json => console.log(json))
    }
  return alert("The address you submited was not found please check again and resubmit the form")
}


  render(){
    if(this.state.venue){
      return(
        <div className="edit-listing-form">
          <Form>
            <Form.Field>
              <label>Venue Name</label>
              <input onChange={(e) => this.handleInputChange("name", e.target.value)} value={this.state.name} />
            </Form.Field>
            <Form.Field>
              <label>Venue Address</label>
              <input onChange={(e) => this.handleInputChange("address", e.target.value)} value={this.state.address} />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input onChange={(e) => this.handleInputChange("city", e.target.value)} value={this.state.city} />
            </Form.Field>
            <Form.Field>
              <label>State</label>
              <input onChange={(e) => this.handleInputChange("state", e.target.value)} value={this.state.state} />
            </Form.Field>
            <Form.Field>
              <label>Zipcode</label>
              <input onChange={(e) => this.handleInputChange("zipcode", e.target.value)} value={this.state.zipcode} />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input onChange={(e) => this.handleInputChange("number", e.target.value)} value={this.state.number} />
            </Form.Field>
            {this.getSpecialsDetails(this.state.venue)}
            <Button onSubmit={this.handleEditSubmit} type='submit'>Edit</Button>
          </Form>
        </div>
      )
    }
    return (
      <Segment className="loading-icon">
        <Dimmer active inverted>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
        <Image src='/assets/images/wireframe/short-paragraph.png' />
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return ({
    venues: state.venues,
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    setCurrentVenues: (sortedVenues) => { dispatch(setCurrentVenues(sortedVenues)) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
