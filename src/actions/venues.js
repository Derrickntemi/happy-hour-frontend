import VenuesApi from "../services/venuesApi";


export function fetchVenuesAction() {
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

// ****************** ADD VENUE ********************

export function postNewVenueAction(venue){
  return function(dispatch) {
    VenuesApi.postVenue(venue)
      .then(venue => {
        dispatch(addVenue(venue))
      })
  }
}

export function addVenue(venue) {
  return({
    type: "ADD_VENUE",
    payload: venue
  })
}

// ****************** EDIT VENUE ********************

export function editVenueAction(venue, id){
  return function(dispatch) {
    VenuesApi.postEditVenue(venue, id)
      .then(venue => {
        dispatch(editVenue(venue))
      })
  }
}

export function editVenue(venue) {
  return({
    type: "EDIT_VENUE",
    payload: venue
  })
}

// *************************************************************

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
  console.log("allVenues", allVenues)
  return function(dispatch) {
    const sortedVenues = allVenues.filter((venue) => {

      return venue.neighborhood === neighborhood && !!venue.specials.find(special => {
        return special.day.toLowerCase() === day.toLowerCase()})
    })
    console.log("sortedVenues", sortedVenues)
    if(sortedVenues.length < 1){
      const nonSortedVenues = allVenues.filter(venue => venue.neighborhood === neighborhood)
      dispatch(setCurrentVenues(nonSortedVenues))
      dispatch(setLastVenueSearched(nonSortedVenues))
    } else {
      dispatch(setCurrentVenues(sortedVenues))
      dispatch(setLastVenueSearched(sortedVenues))
    }
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

export function setIsLoading(loading){
  return function(dispatch){
    dispatch({
      type: "SET_IS_LOADING",
      payload: loading
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

export function setLastVenueSearched(sortedVenues){
  return{
    type: "LAST_VENUE_SEARCHED",
    payload: sortedVenues
  }
}
