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

function getJobsByCategory(category, page) {
  fetch(
    `${theMuseURL}?category=${category}&page=${page}&api_key=${theMuseAPIKey}`
  )
    .then((resp) => resp.json())
    .then((data) => generateJobElements(data.results));
}