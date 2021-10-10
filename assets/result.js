function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');
  
    // Get the query and format values
    var queryJob = searchParamsArr[0].split('=').pop();
    var queryLevel = searchParamsArr[1].split('=').pop();
    var queryIndustry =searchParamsArr[2].split('=').pop();
    searchApi(queryJob, queryLevel, queryIndustry);
  }

console.log(queryJob)

function lunchSearch(inputLoc, levelJo, industryJo) {
    var requestUrl = `https://www.themuse.com/api/public/jobs?location=${inputLoc}&level=${levelJo}&industry=${industryJo}&page=${1}`;
  
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
  