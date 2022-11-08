require('browser-env')();
typeof navigator
console.log(navigator)
console.log(navigator.geolocation)
console.log(global.navigator)

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
    console.log("Geolocation is not supported by this browser.")
  }
}
function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude)
}

getLocation()