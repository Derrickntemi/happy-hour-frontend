export default function rootReducer(
  state = { venues: [], currentVenues: [], currentDay: "", currentComments: [], isLoading: false },
  action
) {
  switch(action.type) {
    case "SET_VENUES":
      return ( Object.assign({}, state, {venues: action.payload}))
    case "SET_CURRENT_VENUES":
      return (Object.assign({}, state, {currentVenues: action.payload}))
    case "SET_CURRENT_DAY":
      return (Object.assign({}, state, {currentDay: action.payload}))
    case "SET_CURRENT_COMMENTS":
      return (Object.assign({}, state, {currentComments: action.payload}))
    case "ADD_COMMENT":
      return (Object.assign({}, state, {currentComments: state.currentComments.concat(action.payload)}))
    default:
      return state;
  }
}
