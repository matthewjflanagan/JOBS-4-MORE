function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var parameterSearch = document.location.search.split('&');
  console.log(parameterSearch)
    // Get the query and format values
    var queryLocation = parameterSearch[0].split('=').pop();
    var queryLevel = parameterSearch[1].split('=').pop();
    var queryIndustry =parameterSearch[2].split('=').pop();
    console.log(queryLocation)
    searchApi(queryLocation, queryLevel, queryIndustry);
  }


  function searchApi(queryLocation, queryLevel, queryIndustry) {
    var requestUrl = `https://www.themuse.com/api/public/jobs?location=${queryLocation}&level=${queryLevel}&industry=${queryIndustry}&page=${1}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      })
  }


  getParams();



//   function mapLocation(inputLoc) {
  
//     var requestUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + inputLoc +
//       "&appid=5ec79846ae2fb1a4571dea79f4797492"
  
//     fetch(requestUrl1)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data1) {
//         console.log(data1)
//         latitude = data1.coord.lat
//         longitude = data1.coord.lon
//         console.log(latitude)
//         console.log(longitude)
//       })
//   }
  