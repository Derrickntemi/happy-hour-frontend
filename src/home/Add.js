import React from 'react'
import { connect } from 'react-redux';
import geocoder from 'geocoder'
import { Button, Form, Grid, Select } from 'semantic-ui-react'
import { neighborhoodOptions } from '../helpers/selectOptions'





class Add extends React.Component {

  state = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    neighborhood: '',
    number: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
    mondaysTime: '',
    tuesdaysTime: '',
    wednesdaysTime: '',
    thursdaysTime: '',
    fridaysTime: '',
    saturdaysTime: '',
    sundaysTime: '',
    latitude: '',
    longitude: ''
  }

  handleInputChange = (input, value) => {
    this.setState({
      [input]: value
    })
  }

  handleAddSubmit = () => {
    const address = `${this.state.address} ${this.state.city}, ${this.state.state} ${this.state.zipcode}`
    console.log("address", address)
    return geocoder.geocode(address, (err, data) => {
      if(data.status === "OK"){
        data.results.forEach(result => {
          const lat = result.geometry.location.lat;
          const lng = result.geometry.location.lng;
          console.log("latitude", lat)
          this.setState({
            latitude: lat,
            longitude: lng,
          })
        })
        const addVenueObj = {
          venue_name: this.state.name,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          neighborhood: this.state.neighborhood,
          phone_number: this.state.number,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          specials: [
            {day: "Sunday", special: this.state.sunday, time: this.state.sundaysTime},
            {day: "Monday", special: this.state.monday, time: this.state.mondaysTime},
            {day: "Tuesday", special: this.state.tuesday, time: this.state.tuesdaysTime},
            {day: "Wednesday", special: this.state.wednesday, time: this.state.wednesdaysTime},
            {day: "Thursday", special: this.state.thursday, time: this.state.thursdaysTime},
            {day: "Friday", special: this.state.friday, time: this.state.fridaysTime},
            {day: "Saturday", special: this.state.saturday, time: this.state.saturdaysTime},
          ]
        }
        return fetch("http://localhost:3000/venues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(addVenueObj)
        })
        .then(window.location = "http://localhost:3001/")
      } else {
        return alert("Address is invalid. Please try again!")
      }
    })
  }

  render(){
    return(
      <Grid className="add-listing-form">
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={12}>
            <Form><h1 className="add-form-heading">Add a New Happy Hour Spot!</h1>
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
                  <input onChange={(e) => this.handleInputChange("state", e.target.value)} value={this.state.state}/>
                </Form.Field>
                <Form.Field>
                  <label>Zipcode</label>
                  <input onChange={(e) => this.handleInputChange("zipcode", e.target.value)} value={this.state.zipcode} />
                </Form.Field>

                <Form.Field>
                  <label>Neighborhood</label>
                  <Select
                    onChange={(e) => this.handleInputChange("neighborhood", e.target.value)}
                    value={this.state.neighborhood}
                    options={neighborhoodOptions}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Phone Number</label>
                  <input onChange={(e) => this.handleInputChange("number", e.target.value)} value={this.state.number}/>
                </Form.Field>
                <Form.Field>
                  <label>Monday&#39;s Special</label>
                  <input onChange={(e) => this.handleInputChange("monday", e.target.value)} value={this.state.monday}/>
                </Form.Field>
                <Form.Field>
                  <label>Monday&#39;s Happy Hour Time</label>
                  <input onChange={(e) => this.handleInputChange("mondaysTime", e.target.value)} value={this.state.mondaysTime}/>
                </Form.Field>
                <Form.Field>
                  <label>Tuesday&#39;s Special</label>
                  <input onChange={(e) => this.handleInputChange("tuesday", e.target.value)} value={this.state.tuesday}/>
                </Form.Field>
                <Form.Field>
                  <label>Tuesday&#39;s Happy Hour Time</label>
                  <input onChange={(e) => this.handleInputChange("tuesdaysTime", e.target.value)} value={this.state.tuesdaysTime}/>
                </Form.Field>
                <Form.Field>
                  <label>Wednesday&#39;s Special</label>
                  <input onChange={(e) => this.handleInputChange("wednesday", e.target.value)} value={this.state.wednesday}/>
                </Form.Field>
                <Form.Field>
                  <label>Wednesday&#39;s Happy Hour Time</label>
                  <input onChange={(e) => this.handleInputChange("wednesdaysTime", e.target.value)} value={this.state.wednesdaysTime}/>
                </Form.Field>
                <Form.Field>
                  <label>Thursday&#39;s Special</label>
                  <input onChange={(e) => this.handleInputChange("thursday", e.target.value)} value={this.state.thursday}/>
                </Form.Field>
                <Form.Field>
                  <label>Thursday&#39;s Happy Hour Time</label>
                  <input onChange={(e) => this.handleInputChange("thursdaysTime", e.target.value)} value={this.state.thursdaysTime}/>
                </Form.Field>
                <Form.Field>
                  <label>Friday&#39;s Special</label>
                  <input onChange={(e) => this.handleInputChange("friday", e.target.value)} value={this.state.friday}/>
                </Form.Field>
                <Form.Field>
                  <label>Friday&#39;s Happy Hour Time</label>
                  <input onChange={(e) => this.handleInputChange("fridaysTime", e.target.value)} value={this.state.fridaysTime}/>
                </Form.Field>
                <Form.Field>
                  <label>Saturday&#39;s Special</label>
                  <input onChange={(e) => this.handleInputChange("saturday", e.target.value)} value={this.state.saturday}/>
                </Form.Field>
                <Form.Field>
                  <label>Saturday&#39;s Happy Hour Time</label>
                  <input onChange={(e) => this.handleInputChange("saturdaysTime", e.target.value)} value={this.state.saturdaysTime}/>
                </Form.Field>
                <Form.Field>
                  <label>Sunday&#39;s Special</label>
                  <input onChange={(e) => this.handleInputChange("sunday", e.target.value)} value={this.state.sunday}/>
                </Form.Field>
                <Form.Field>
                  <label>Sunday&#39;s Happy Hour Time</label>
                  <input onChange={(e) => this.handleInputChange("sundaysTime", e.target.value)} value={this.state.sundaysTime}/>
                </Form.Field>

                <Button onClick={this.handleAddSubmit} type='submit'>Add Happy Hour!</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={2}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return ({
    venues: state.venues,
  })
}


export default connect(mapStateToProps, null)(Add)
