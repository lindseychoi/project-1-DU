//GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////
const searchInputBox = document.getElementById("input-box");
const searchButton = document.getElementById("search_button");
const userLocation = document.querySelector('#input');
const openWeatherAPIKey = "61bd5a7935f37e9c18cacd14e8c89bc3";
const openCageAPIKey = "0148c7965c584dfc849607c4be6c640b";
const trailApiKey = "d0940ee964msh728cc5d9f2642bap1a36ccjsne2e0b86173ec";


//API FUNCTIONS//////////////////////////////////////////////////////////////////////////////////////
//Used async functions to allow the program to run more efficiently. 
//stored the resulting information from the fetch in a variable so that we could use the information more easily.


//Trail API for fetching information about the trails at the lat and long specified. 

async function getTrails(latitude, longitude) {
  //console.log("trail api activated");

  var url = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" + latitude + "&lon=" + longitude;

  var requestOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
      "x-rapidapi-key": "d0940ee964msh728cc5d9f2642bap1a36ccjsne2e0b86173ec"
    }
  }

  var response = await fetch(url, requestOptions);
  console.log(response);
  return await response.json();

}

//Open Cage API changes the city name to latitude and longitude, which was necessary for the Trail API.
// TODO: In the future, we would like to narrow the search down to use state, country as parameters so that user gets the information for the exact location they want.
async function getLatitudeLongitude(city) {

  var url = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=" + openCageAPIKey;
  //console.log();
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  var results = await fetch(url, requestOptions);
  //console.log("open cage api");
  return await results.json();

}

//5 day weather forecast from Open Weather, calls by city name.
async function getFiveDayForecast(cityName) {

  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + openWeatherAPIKey + "&units=imperial";

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  var results = await fetch(url, requestOptions);
  return await results.json();

}

//OTHER FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////////

//the following function will be performed when search is clicked (event listener at bottom in the logic portion of this file)
//this function runs the API functions above, utilizing the input box space and the city name that was typed there
//it also runs the drawing functions, which places the information from the API's onto the document
async function search() {

  console.log("search is ran");
  const cityName = searchInputBox.value.trim();
  var forecastData = await getFiveDayForecast(cityName);
  //showElem();
  var searchResultsHeader = document.getElementById("write-city-name-search-results-here");
  searchResultsHeader.innerHTML = "Hiking trails near: " + cityName;
  var overwriteAuthorName = document.getElementById("overwrite-to-blank");
  overwriteAuthorName.innerHTML = "";
  console.log(forecastData);
  drawFiveDayForecast(forecastData.list);
  var latitudeLongitude = await getLatitudeLongitude(cityName);
  //console.log(latitudeLongitude.results);
  var latitude = latitudeLongitude.results[0].geometry;
  const { lat, lng } = latitude;
  console.log(latitude);
  var trailInfo = await getTrails(lat, lng);
  console.log(trailInfo);
  drawTrailInfo(trailInfo.data);

}

//the following function will render the top 3 trails found for the location inputted.
//Each trail will display the following information: trail name, trail length, trail difficulty, trail description, trail directions.
async function drawTrailInfo(trailsInformation) {
  console.log("drawTrailsInfo is running");

  var trailNumberZeroName = document.getElementById("hike-0-name");
  trailNumberZeroName.innerHTML = "Trail Name #1: " + trailsInformation[0].name;
  var trailNumberZeroLength = document.getElementById("hike-0-length");
  trailNumberZeroLength.innerHTML = "Length: " + trailsInformation[0].length + " miles";
  var trailNumberZeroDifficulty = document.getElementById("hike-0-difficulty");
  trailNumberZeroDifficulty.innerHTML = "Difficulty: " + trailsInformation[0].difficulty;
  var trailNumberZeroDescription = document.getElementById("hike-0-description");
  trailNumberZeroDescription.innerHTML = "Hiker Review: " + trailsInformation[0].description;
  var trailNumberZeroDirections = document.getElementById("hike-0-directions");
  trailNumberZeroDirections.innerHTML = "Directions: " + trailsInformation[0].directions;

  var trailNumberOneName = document.getElementById("hike-1-name");
  trailNumberOneName.innerHTML = "Trail Name #2: " + trailsInformation[1].name;
  var trailNumberOneLength = document.getElementById("hike-1-length");
  trailNumberOneLength.innerHTML = "Length: " + trailsInformation[1].length + " miles";
  var trailNumberOneDifficulty = document.getElementById("hike-1-difficulty");
  trailNumberOneDifficulty.innerHTML = "Difficulty: " + trailsInformation[1].difficulty;
  var trailNumberOneDescription = document.getElementById("hike-1-description");
  trailNumberOneDescription.innerHTML = "Hiker Review: " + trailsInformation[1].description;
  var trailNumberOneDirections = document.getElementById("hike-1-directions");
  trailNumberOneDirections.innerHTML = "Directions: " + trailsInformation[1].directions;

  var trailNumberTwoName = document.getElementById("hike-2-name");
  trailNumberTwoName.innerHTML = "Trail Name #3: " + trailsInformation[2].name;
  var trailNumberTwoLength = document.getElementById("hike-2-length");
  trailNumberTwoLength.innerHTML = "Length: " + trailsInformation[2].length + " miles";
  var trailNumberTwoDifficulty = document.getElementById("hike-2-difficulty");
  trailNumberTwoDifficulty.innerHTML = "Difficulty: " + trailsInformation[2].difficulty;
  var trailNumberTwoDescription = document.getElementById("hike-2-description");
  trailNumberTwoDescription.innerHTML = "Hiker Review: " + trailsInformation[2].description;
  var trailNumberTwoDirections = document.getElementById("hike-2-directions");
  trailNumberTwoDirections.innerHTML = "Directions: " + trailsInformation[2].directions;




}

//the following function will render the five day forecast for the searched city on the cards on the HTML page. 
//we have a default set in the input box for Denver
async function drawFiveDayForecast(data) {
  index = 0


  //5 day forecast date information
  var dayZeroDate = document.getElementById("day-0-date");
  dayZero = data[index].dt;
  dayZeroDate.innerHTML = moment(new Date(dayZero * 1000)).format("L");
  var dayOneDate = document.getElementById("day-1-date");
  dayOne = data[index + 8].dt;
  dayOneDate.innerHTML = moment(new Date(dayOne * 1000)).format("L");
  var dayTwoDate = document.getElementById("day-2-date");
  dayTwo = data[index + 16].dt;
  dayTwoDate.innerHTML = moment(new Date(dayTwo * 1000)).format("L");
  var dayThreeDate = document.getElementById("day-3-date");
  dayThree = data[index + 24].dt;
  dayThreeDate.innerHTML = moment(new Date(dayThree * 1000)).format("L");
  var dayFourDate = document.getElementById("day-4-date");
  dayFour = data[index + 32].dt;
  dayFourDate.innerHTML = moment(new Date(dayFour * 1000)).format("L");

  //5 day forecast temp information
  var dayZeroTemp = document.getElementById("day-0-temp");
  dayZeroTemp.innerHTML = "Temp: " + data[index].main.temp + " °F";
  var dayOneTemp = document.getElementById("day-1-temp");
  dayOneTemp.innerHTML = "Temp: " + data[index + 8].main.temp + " °F";
  var dayTwoTemp = document.getElementById("day-2-temp");
  dayTwoTemp.innerHTML = "Temp: " + data[index + 16].main.temp + " °F";
  var dayThreeTemp = document.getElementById("day-3-temp");
  dayThreeTemp.innerHTML = "Temp: " + data[index + 24].main.temp + " °F";
  var dayFourTemp = document.getElementById("day-4-temp");
  dayFourTemp.innerHTML = "Temp: " + data[index + 36].main.temp + " °F";

  //5 day forecast wind information
  var dayZeroWind = document.getElementById("day-0-wind");
  dayZeroWind.innerHTML = "Wind: " + data[index].wind.speed + " mph";
  var dayOneWind = document.getElementById("day-1-wind");
  dayOneWind.innerHTML = "Wind: " + data[index + 8].wind.speed + " mph";
  var dayTwoWind = document.getElementById("day-2-wind");
  dayTwoWind.innerHTML = "Wind: " + data[index + 16].wind.speed + " mph";
  var dayThreeWind = document.getElementById("day-3-wind");
  dayThreeWind.innerHTML = "Wind: " + data[index + 24].wind.speed + " mph";
  var dayFourWind = document.getElementById("day-4-wind");
  dayFourWind.innerHTML = "Wind: " + data[index + 36].wind.speed + " mph";

  //5 day forecast humidity information
  var dayZeroHumidity = document.getElementById("day-0-humidity");
  dayZeroHumidity.innerHTML = "Humidity: " + data[index].main.humidity + "%";
  var dayOneHumidity = document.getElementById("day-1-humidity");
  dayOneHumidity.innerHTML = "Humidity: " + data[index + 8].main.humidity + "%";
  var dayTwoHumidity = document.getElementById("day-2-humidity");
  dayTwoHumidity.innerHTML = "Humidity: " + data[index + 16].main.humidity + "%";
  var dayThreeHumidity = document.getElementById("day-3-humidity");
  dayThreeHumidity.innerHTML = "Humidity: " + data[index + 24].main.humidity + "%";
  var dayFourHumidity = document.getElementById("day-4-humidity");
  dayFourHumidity.innerHTML = "Humidity: " + data[index + 36].main.humidity + "%";

  //5 day forecast weather description

  var dayZeroIcon = document.getElementById("day-0-icon");
  dayZeroIcon.innerHTML = data[index].weather[index].description;
  var dayOneIcon = document.getElementById("day-1-icon");
  dayOneIcon.innerHTML = data[index + 8].weather[index].description;
  var dayTwoIcon = document.getElementById("day-2-icon");
  dayTwoIcon.innerHTML = data[index + 16].weather[index].description;
  var dayThreeIcon = document.getElementById("day-3-icon");
  dayThreeIcon.innerHTML = data[index + 24].weather[index].description;
  var dayFourIcon = document.getElementById("day-4-icon");
  dayFourIcon.innerHTML = data[index + 36].weather[index].description;;

}

//functions to hide elements until search is ran with the click
// function hideElem() {
//   document.getElementById("hidden-info").style.visibility = "hidden";
// }

// function showElem() {
//   document.getElementById("hidden-info").style.visibility = "visible";
// }

$(document).ready(async function () {

  //hideElem();
  searchButton.addEventListener('click', search);
  searchInputBox.value = "Denver";
  search();

});


