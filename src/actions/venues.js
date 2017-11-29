import VenuesApi from "../services/venuesApi";


export function fetchVenuesAction() {
  console.log("fetchVenues")
  return function(dispatch) {
    VenuesApi.fetchVenues().then(venues => {
      dispatch(fetchedVenues(venues))
    })
  }
}

export function fetchCommentsAction(id) {
  return function(dispatch) {
    VenuesApi.fetchComments(id)
      .then(comments => {
        dispatch(setCurrentComments(comments))
      })
  }
}

export function addComment(comment) {
  return({
    type: "ADD_COMMENT",
    payload: comment
  })
}

export function setCurrentComments(comments){
  return {
    type: "SET_CURRENT_COMMENTS",
    payload: comments
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

export function setUserLocation(loc) {
  return function(dispatch) {
    dispatch({
      type: "SET_USER_LOCATION",
      payload: loc
    })
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
