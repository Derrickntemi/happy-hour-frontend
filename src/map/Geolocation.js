
function handleGottenPosition(pos) {
  console.log("coodinates", pos.coords);
  return [pos.coords.latitude, pos.coords.longitude]
}

  export function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGottenPosition)
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
