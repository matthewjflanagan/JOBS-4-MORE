var companies = $("#company-name")
var jobLocations = $("#job-location")
console.log(companies)
var userStorage= JSON.parse(localStorage.getItem("userstorages")) || [];
console.log(userStorage[0])
var newLevel= userStorage[0].lev
var newCategory= userStorage[0].cat
var newLocation= userStorage[0].loc


var queryString1 =
"./results-page.html?q=" +
newLocation +
"&level=" +
newLevel +
"&category=" +
newCategory;
console.log(queryString1)

var companyLocation = JSON.parse(localStorage.getItem("comploc")) || [];


console.log(companyLocation[0])
var companyLocationLi = $("<li>")
 companyLocationLi.text(companyLocation[0].names+": "+companyLocation[0].locations)
 companies.append(companyLocationLi)

 var clear = $("#go-back")

 clear.on("click", function(){
//    localStorage.removeItem(companyLocation[0].names);
//    localStorage.clear()
//    location.reload;
    
    
});


 // for (var i = 0; i < companyLocation.length; i++){

//     var companyLocationLi = $("<li>")

//     companyLocationLi.text(companyLocation[0][i].names +":" + " " + companyLocation[0][i].locations);

//     companies.append(companyLocationLi)

// }