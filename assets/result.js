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
        for (var i = 0; i < data.results.length; i++){

          var jobName = data.results[i].name
          console.log(jobName)
          var jobCompany = data.results[i].company.name
          console.log(jobCompany)
          var jobLocation = data.results[i].locations[0].name;
          console.log(jobLocation)
          var jobPublicationDate = data.results[i].publication_date;
          console.log(jobPublicationDate)
          var jobLevel = data.results[i].levels[0].name
          console.log(jobLevel)
          var jobDescription = data.results[i].contents;
          console.log (jobDescription)
          var  jobsContainer = $("#results")
          var jobCard = $("<div>");
          var descriptionElem = $("<div>")
          descriptionElem.html(jobDescription);
          var jobNames = $("<h3>")
          jobNames.text(jobName)
          jobCard.append(jobNames)
          //   Another way of appending the company name:   jobCard.append(`<h3>${jobName}</h3>`);
          var companies = $("<p>")
          companies.text("Company:" + jobCompany)
          jobCard.append(companies)
          // Another way of appending the company:  jobCard.append(`<p>Company: ${jobCompany}</p>`);
          var locations = $("<p>")
          locations.text("Location:" + jobLocation)
          jobCard.append(locations)
        // Another way of appending the location:  jobCard.append(`<p>Location: ${jobLocation}</p>`);
        var publications = $("<p>")
          publications.text("Job Posted Date:" + jobPublicationDate)
          jobCard.append(publications)

        // Another way of appending the publication:  jobCard.append(`<p>Job Posted Date: ${jobPublicationDate}</p>`);
        jobCard.append(descriptionElem);
        jobsContainer.append(jobCard);



        }


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
// //   }
// var issueEl = document.createElement('a');
// issueEl.classList = 'list-item flex-row justify-space-between align-center';
// issueEl.setAttribute('href', issues[i].html_url);
// issueEl.setAttribute('target', '_blank');
// var displayWarning = function (repo) {
//   limitWarningEl.textContent = 'To see more than 30 issues, visit ';

//   var linkEl = document.createElement('a');
//   linkEl.textContent = 'GitHub.com';
//   linkEl.setAttribute('href', 'https://github.com/' + repo + '/issues');
//   linkEl.setAttribute('target', '_blank');

//   // This will appear on the bottom of the page.
//   limitWarningEl.appendChild(linkEl);
// };
// var userName = document.createElement('h3');
// var issueTitle = document.createElement('p');
// userName.textContent = data[i].user.login;
// issueTitle.textContent = data[i].title;
// issueContainer.append(userName);
// issueContainer.append(issueTitle);