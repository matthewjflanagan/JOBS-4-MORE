$(document).ready(function () {
var inputLocation = $("#location-input")
var levelJobs = $("#level-input")
var industryJobs = $("#industry-input")
var latitude
var longitude
var searchFormEl = document.querySelector('#search-form');

function startSearch(event) {
  event.preventDefault()
  var inputLoc = inputLocation.val().trim()
  var levelJo = levelJobs.val()
  var industryJo = industryJobs.val()
  lunchSearch(inputLoc, levelJo, industryJo)
  mapLocation(inputLoc)
}

$("#search-button").on("click", startSearch)

function startSearch(event) {
  event.preventDefault()
  var inputLoc = inputLocation.val().trim()
  var levelJo = levelJobs.val()
  var industryJo = industryJobs.val()

  if (!inputLoc && !levelJo && !industryJo){
  alert("Must fill out all the form")
  } else {
  var queryString = "./results-page.html?q=" + inputLoc + "&level=" + levelJo + "&industry=" + industryJo

 location.assign(queryString)
  lunchSearch(inputLoc, levelJo, industryJo)
  mapLocation(inputLoc)
  }
}

function lunchSearch(inputLoc, levelJo, industryJo) {
  var requestUrl = "https://www.themuse.com/api/public/jobs?location=" + inputLoc +
    "&level=" + levelJo + "&industry=" + industryJo + "&page=" + 1;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    })
}

function mapLocation(inputLoc) {
  var requestUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + inputLoc +
    "&appid=5ec79846ae2fb1a4571dea79f4797492"

  fetch(requestUrl1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data1) {
      console.log(data1)
      latitude = data1.coord.lat
      longitude = data1.coord.lon
      console.log(latitude)
      console.log(longitude)
    })
}

function initMap() {
  //Map options
  var options = {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
  }
  //New map
  var map = new google.maps.Map(document.getElementById("map"), options);
  // Add marker
  var marker = new google.maps.Marker({
    position: { lat: -34.397, lng: 150.644 },
    map: map,
    title: "Click to zoom"
  })

  map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(() => {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  marker.addListener("click", () => {
  map.setZoom(8);
  map.setCenter(marker.getPosition());
  });
}
    
const theMuseAPIKey =
  "d5b8e452dd88c290c37f959a5c0f515789058d878d5e5749a5781329f40b7f32";
const theMuseURL = "https://www.themuse.com/api/public/jobs";

let jobsContainer = $("#jobs-container");

function generateJobElements(results) {
  console.log(results);
  results.forEach(function (element) {
    console.log(results)
    let name = element.name;
    let company = element.company.name;
    let location = element.locations[0].name;
    let publicationDate = element.publication_date;
    let description = element.contents;
    let jobCard = $("<div>");
    let descriptionElem = $("<div>");
    descriptionElem.html(description);
    jobCard.append(`<h3>${name}</h3>`);
    jobCard.append(`<p>Company: ${company}</p>`);
    jobCard.append(`<p>Location: ${location}</p>`);
    jobCard.append(`<p>Job Posted Date: ${publicationDate}</p>`);
    jobCard.append(descriptionElem);
    jobsContainer.append(jobCard);
  });
}

const theMuseAPIKey =
  "d5b8e452dd88c290c37f959a5c0f515789058d878d5e5749a5781329f40b7f32";
const theMuseURL = "https://www.themuse.com/api/public/jobs";
var data;
let jobsContainer = $("#jobs-container");

function generateJobElements(results) {
  console.log(results);
  results.forEach(function (element) {
    let name = element.name;
    let company = element.company.name;
    let location = element.locations[0].name;
    let publicationDate = element.publication_date;
    let description = element.contents;
    let jobCard = $("<div>");
    let descriptionElem = $("<div>");
    descriptionElem.html(description);
    jobCard.append(`<h3>${name}</h3>`);
    jobCard.append(`<p>Company: ${company}</p>`);
    jobCard.append(`<p>Location: ${location}</p>`);
    jobCard.append(`<p>Job Posted Date: ${publicationDate}</p>`);
    jobCard.append(descriptionElem);
    jobsContainer.append(jobCard);
  });
}


function getJobsByCategory(category, page) {
  fetch(
    `${theMuseURL}?category=${category}&page=${page}&api_key=${theMuseAPIKey}`
  )
    .then((resp) => resp.json())
    .then((data) => generateJobElements(data.results));

fetch("https://google-maps-geocoding.p.rapidapi.com/geocode/json?lat="+ latitude +
"lng="+ longitude +"&language=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
		"x-rapidapi-key": "12281ef330msh7c64940306c1581p1c1845jsn975aa83a9641"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
}
})