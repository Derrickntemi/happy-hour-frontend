import { setUserLocation } from '../actions/venues.js'

function addLocationToStore(loc, store) {
  setUserLocation(loc)(store.dispatch)
}

function getLocation(store) {
  navigator.geolocation.getCurrentPosition(function(pos) {
    addLocationToStore([pos.coords.latitude, pos.coords.longitude], store)
  })
}

export function setLocation(store) {
  navigator.geolocation ? getLocation(store) : alert("Geolocation is not supported by this browser.");
}
