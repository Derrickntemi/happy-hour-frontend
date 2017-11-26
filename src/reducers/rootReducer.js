export default function rootReducer(
  state = { venues: [], currentVenues: [], currentDay: "", isLoading: false },
  action
){
  switch(action.type) {
    case "SET_VENUES":
      return ( Object.assign({}, state, {venues: action.payload}))
    case "SET_CURRENT_VENUES":
      return(Object.assign({}, state, {currentVenues: action.payload}))
    case "SET_CURRENT_DAY":
      return(Object.assign({}, state, {currentDay: action.payload}))
    default:
      return state;
  }
}
