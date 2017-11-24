import VenuesApi from "../services/venuesApi";


export function fetchVenuesAction() {
  console.log("fetchVenues")
  return function(dispatch) {
    VenuesApi.fetchVenues().then(venues => {
      console.log('venues', venues)
      dispatch(fetchedVenues(venues))
    })
  }
}

function fetchedVenues(json) {
  return {
    type: "SET_VENUES",
    payload: json,
  }
}
