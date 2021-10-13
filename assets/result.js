var joobleAPIKey = "2602e22f-9b58-49a6-bbdf-15679eaaf126";
var themuseAPIKey;
var jobsContainer = $("#results");

function getParams() {
  var parameterSearch = document.location.search.split("&");
  console.log(parameterSearch);
  // Get the query and format values
  var queryLocation = parameterSearch[0].split("=").pop();
  var queryLevel = parameterSearch[1].split("=").pop();
  var queryCategory = parameterSearch[2].split("=").pop();
  console.log(queryLocation);
  return {
    location: queryLocation,
    level: queryLevel,
    category: queryCategory,
  };
}

function writeJob(job) {
  // Job is an object that has these properties:
  // {
  //    title: string,
  //    company: string,
  //    location: string,
  //    description: string,
  //    postedDate: datetime
  //    level: string (optional)
  // }
  var jobCardEl = $("<div>").addClass('border');
  $('.border').css('border', 'solid 2px black')
  var descriptionEl = $("<div>");
  descriptionEl.html(job.description);
  var jobNameEl = $("<h3>");
  jobNameEl.text(job.title);
  jobCardEl.append(jobNameEl);
  var companyEl = $("<p>");
  companyEl.text("Company: " + job.company);
  jobCardEl.append(companyEl);
  var locationEl = $("<p>");
  locationEl.text("Location: " + job.location);
  jobCardEl.append(locationEl);
  var updatedEl = $("<p>");
  updatedEl.text("Job Updated Date: " + job.postedDate);
  jobCardEl.append(updatedEl);
  jobCardEl.append(descriptionEl);
  jobsContainer.append(jobCardEl);

  // var border = $('.border')
  // for (var i = 0, len = border.length; i < len; i++) {
  //   border[i].click(LunchJobPage());
  // }

  $(".border").on("click", function(){
      /* Do your stuffs here */
      var storeCompLoc={

        names: job.company,
        locations: job.location
      }
      console.log(storeCompLoc)
      var companyLocation = JSON.parse(localStorage.getItem("comploc")) || [];
      console.log(companyLocation)
      companyLocation.push(storeCompLoc)
      localStorage.setItem("comploc", JSON.stringify(companyLocation));
      
      location.assign("./job-descrition.html");
    });
  


//   function LunchJobPage(){
// var storeCompLoc={

//   names: job.company,
//   locations: job.location
// }
// console.log(storeCompLoc)
// var companyLocation = JSON.parse(localStorage.getItem("comploc")) || [];
// console.log(companyLocation)
// companyLocation.push(storeCompLoc)
// localStorage.setItem("comploc", JSON.stringify(companyLocation));

// location.assign("./job-descrition.html");
//   }

}

function searchJooble(queryLocation, queryLevel, queryCategory) {
  var searchParams = {
    location: decodeURIComponent(queryLocation),
    keywords:
      decodeURIComponent(queryCategory) + " " + decodeURIComponent(queryLevel),
    page: 1,
  };

  var requestUrl = `https://jooble.org/api/${joobleAPIKey}`;
  fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchParams),
  })
    .then((data) => data.arrayBuffer())
    .then((buffer) => String.fromCharCode.apply(null, new Int8Array(buffer)))
    .then((result) => JSON.parse(result))
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.jobs.length; i++) {
        var job = {
          title: data.jobs[i].title,
          company: data.jobs[i].company,
          location: data.jobs[i].location,
          description: data.jobs[i].snippet,
          postedDate: data.jobs[i].updated,
          level: null,
        };
        writeJob(job);
      }
    });
}

function searchMuse(queryLocation, queryLevel, queryCategory) {
  var requestUrl = `https://www.themuse.com/api/public/jobs?location=${queryLocation}&level=${queryLevel}&category=${queryCategory}&page=${1}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        var job = {
          title: data.results[i].name,
          company: data.results[i].company.name,
          location: data.results[i].locations[0].name,
          description: data.results[i].contents,
          postedDate: data.results[i].publication_date,
          level: data.results[i].levels[0].name,
        };
        writeJob(job);
      }
    });
}

var params = getParams();
searchMuse(params.location, params.level, params.category);
// searchJooble(params.location, params.level, params.category);
