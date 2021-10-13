var companies = $("#company-name")
var jobLocations = $("#job-location")
console.log(companies)

var companyLocation = JSON.parse(localStorage.getItem("comploc")) || [];

for (var i = 0; i < companyLocation.length; i++){

    var companyLocationLi = $("<li>")

    companyLocationLi.text(companyLocation[i].names +":" + " " + companyLocation[i].locations);

    companies.append(companyLocationLi)

}