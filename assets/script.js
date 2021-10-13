var city = $("#city-input");
var states = $("#states-input");
console.log(city);
var jobLevels = $("#level-input");
var jobCategories = $("#category-input");

var latitude;
var longitude;

$("#search-button").on("click", startSearch);

function startSearch(event) {
  event.preventDefault();
  var inputCity = city.val().trim();
  console.log(inputCity);
  var inputStates = states.val();
  var inputLoc = inputCity + ", " + inputStates;
  console.log(inputLoc);
  var jobLevel = jobLevels.val();
  var jobCategory = jobCategories.val();

  if (!inputLoc && !jobLevel && !jobCategory) {
    console.log("Must fill out all the form");
  } else {
    var queryString =
      "./results-page.html?q=" +
      inputLoc +
      "&level=" +
      jobLevel +
      "&category=" +
      jobCategory;

    location.assign(queryString);
    
  }
}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.753746, lng: -84.386330 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  var input = document.getElementById("search-input");
  var searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

