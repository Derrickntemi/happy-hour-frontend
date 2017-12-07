export default class VenuesApi {

  static fetchVenues() {
    console.log("api call")
    return fetch("https://happyhour-server.herokuapp.com/venues")
      .then(res => res.json())
  }

  static postComments(params) {
    return fetch(`https://happyhour-server.herokuapp.com/venues/${params.venue_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(params)
    })
  }

  static fetchComments(id){
    return fetch(`https://happyhour-server.herokuapp.com/venues/${id}/comments`)
      .then(res => res.json())
  }
}
