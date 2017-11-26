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

export function sortedByDayAndNeighborhood(day, neighborhood, allVenues) {

  return function(dispatch) {
    const sortedVenues = allVenues.filter((venue) => {

      return venue.neighborhood.toLowerCase() === neighborhood.toLowerCase() && !!venue.specials.find(special => {
        return special.day.toLowerCase() === day.toLowerCase()})
    })
    dispatch(setCurrentVenues(sortedVenues))
    dispatch(setCurrentDay(day))
  }
}

function setCurrentVenues(json) {
  return {
    type: "SET_CURRENT_VENUES",
    payload: json,
  }
}

export function setCurrentDay(day) {
  return {
    type: "SET_CURRENT_DAY",
    payload: day
  }
}
