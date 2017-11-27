export default class VenuesApi {

  static fetchVenues() {
    console.log("api call")
    return fetch("http://localhost:3000/venues")
      .then(res => res.json())
  }

  static postComments(params) {
    return fetch("http://localhost:3000/comments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
  }

}
