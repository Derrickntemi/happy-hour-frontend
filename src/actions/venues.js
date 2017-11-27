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

function fetchedVenues(venues) {
  return {
    type: "SET_VENUES",
    payload: venues,
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

export function setCurrentVenues(sortedVenues) {
  return {
    type: "SET_CURRENT_VENUES",
    payload: sortedVenues,
  }
}

export function setCurrentDay(day) {
  return {
    type: "SET_CURRENT_DAY",
    payload: day
  }
}

export function setShowVenue(id) {
  return {
    type: "SET_SHOW_VENUE",
    payload: id
  }
}
