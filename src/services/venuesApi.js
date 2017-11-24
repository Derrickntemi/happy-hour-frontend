export default class VenuesApi {

  static fetchVenues() {
    console.log("api call")
    return fetch("http://localhost:3000/venues")
      .then(res => res.json())
  }

}
