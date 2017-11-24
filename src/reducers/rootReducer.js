export default function rootReducer(
  state = { venues: [], isLoading: false },
  action
){
   switch(action.type) {
     case "SET_VENUES":
      console.log("set venues reducer", action.payload)
      return ( Object.assign({}, state, {venues: action.payload}))
    default:
      return state;
   }
}
