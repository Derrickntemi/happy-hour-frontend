export default class VenuesApi {

  static fetchVenues() {
    console.log("api call")
    return fetch("http://localhost:3000/venues")
      .then(res => res.json())
  }

  static postComments(params) {
    console.log("params", params)
    return fetch(`http://localhost:3000/venues/${params.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(params)
    })
  }

  static fetchComments(id){
    return fetch(`http://localhost:3000/venues/${id}/comments`)
      .then(res => res.json())
  }
}
