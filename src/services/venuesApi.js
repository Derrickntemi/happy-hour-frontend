const serverAddress = 'https://happyhour-server.herokuapp.com/venues'
const localAddress = 'http://localhost:3000/venues'
const currentAddress = serverAddress;

export default class VenuesApi {

  static fetchVenues() {
    console.log("api call")
    return fetch(currentAddress)
      .then(res => res.json())
  }

  static postComments(params) {
    return fetch(`${currentAddress}/${params.venue_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(params)
    })
  }

  static fetchComments(id){
    return fetch(`${currentAddress}/${id}/comments`)
      .then(res => res.json())
  }

  static postVenue(params) {
    return fetch(currentAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(params)
    })
    .then(window.location.pathname = "/")
  }

  //TODO:: figure out how to pass venue id even though it is held in state by the edit.js component

  static postEditVenue(params, id){
    return fetch(`${currentAddress}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(window.location.pathname = "/")
  }
}
