export default function rootReducer(
  state = { venues: [], currentVenues: [], isLoading: false },
  action
){
   switch(action.type) {
     case "SET_VENUES":
      return ( Object.assign({}, state, {venues: action.payload}))
     case "SET_CURRENT_VENUES":
      console.log("currentVenues", action.payload )
      return(Object.assign({}, state, {currentVenues: action.payload}))
     default:
      return state;
   }
}
